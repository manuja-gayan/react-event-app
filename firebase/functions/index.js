const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {v2beta3} = require("@google-cloud/tasks");
const sendgrid = require("@sendgrid/mail");

const SECONDS_IN_A_DAY = 86400;
const EMAIL_SEND_CALLBACK_EP =
  "";
const SENDGRID_API_KEY =
  "wermfdksk123ldlfl";
const SERVICE_ACC_EMAIL =
  "cloud-function-invoker@123.iam.gserviceaccount.com";
const QUEUE_LOCATION = "";
const QUEUE_NAME = "event-reminders";
const FROM_EMAIL = "from@gmail.com";

admin.initializeApp();

exports.scheduleNotification = functions.firestore
    .document("/guests/{documentId}")
    .onCreate(async (snap) => {
      const guest = snap.data();
      if (!guest.registeredInterest) {
        return;
      }

      // Fetch document
      const eventDoc = await admin
          .firestore()
          .doc(`/events/${guest.event}`)
          .get();

      // Find time to send email
      const event = eventDoc.data();
      const oneDayBeforeOpen = event.startingDateTime._seconds - SECONDS_IN_A_DAY;
      const nowSeconds = Date.now() / 1000;
      const emailAtSeconds = Math.max(oneDayBeforeOpen, nowSeconds);
      console.info(
          `Scheduled ${guest.event} for ${guest.email} at ${emailAtSeconds}`,
      );

      // Project queue details
      const project = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
      const client = new v2beta3.CloudTasksClient();
      const parent = client.queuePath(project, QUEUE_LOCATION, QUEUE_NAME);

      // Schedule payload information
      const docPath = snap.ref.path;
      const payload = {docPath};

      const convertedPayload = JSON.stringify(payload);
      const body = Buffer.from(convertedPayload).toString("base64");

      // Schedule task.
      const task = {
        httpRequest: {
          httpMethod: "POST",
          url: EMAIL_SEND_CALLBACK_EP,
          oidcToken: {
            serviceAccountEmail: SERVICE_ACC_EMAIL,
          },
          headers: {
            "Content-Type": "application/json",
          },
          body,
          scheduleTime: {
            seconds: emailAtSeconds,
          },
        },
      };

      try {
      // Send create task request.
        const [response] = await client.createTask({parent, task});
        console.log(`Created task ${response.name}`);
        return response.name;
      } catch (error) {
      // Construct error for Stackdriver Error Reporting
        console.error(Error(error.message));
      }
    });

exports.sendEmailCallback = functions.https.onRequest(async (req, res) => {
  try {
    const payload = req.body;
    const guestDoc = await admin.firestore().doc(payload.docPath).get();
    const guest = guestDoc.data();
    if (!guest) {
      res.status(400).send("Guest not found");
      return;
    }

    const eventDoc = await admin
        .firestore()
        .doc(`/events/${guest.event}`)
        .get();
    const event = eventDoc.data();
    const dateStr = new Date(
        event.startingDateTime._seconds * 1000,
    ).toLocaleString([], {timeZone: "Asia/Colombo"});

    // Email data
    const subjectString = `Event Invitation: ${event.title}`;
    const msgString = `Event title: ${event.title} <br/> 
  Event conductor: ${event.conductor} <br/> 
  Event description: ${event.subTitle} <br/> 
  Event scheduled on: ${dateStr} <br/> <br/> 
  <a href="">Click here to view event</a>`;

    // Save document with email data
    await admin
        .firestore()
        .collection("mail")
        .add({
          to: guest.email,
          message: {
            subject: subjectString,
            html: msgString,
          },
        });
    console.log("Wrote mail document");

    // Send email via sendgrid
    sendgrid.setApiKey(SENDGRID_API_KEY);
    const cRes = await sendgrid.send({
      to: guest.email,
      from: FROM_EMAIL,
      subject: subjectString,
      html: msgString,
    });
    console.log("Sendgrid Response: " + cRes);
    res.status(200).send("Email sent");
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});

exports.sendPasswordEmail = functions.firestore
    .document("/staff/{documentId}")
    .onCreate(async (snap) => {
      const staff = snap.data();

      if (!staff.password) {
        console.log("No password field in: " + staff.email);
        return;
      }

      // Email data
      const subjectString = "Event App Staff Account Created!";
      const msgString = `Hello ${staff.name}, <br/> 
      A new staff account was created for this email account. <br/> 
      Following are the credentials. <br/> 
      Email Address: ${staff.email} <br/> 
      Password: ${staff.password} <br/> <br/> 
      <a href="">Click here to access the admin portal</a>`;

      // Send email via sendgrid
      sendgrid.setApiKey(SENDGRID_API_KEY);
      const cRes = await sendgrid.send({
        to: staff.email,
        from: FROM_EMAIL,
        subject: subjectString,
        html: msgString,
      });
      console.log("Sendgrid Response: " + cRes);
    });
