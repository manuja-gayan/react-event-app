import Button from '@material-ui/core/Button';
import { green, orange } from '@material-ui/core/colors';
import { Fab } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

const showStatus = (row, handleModalOpen) => {
  switch (row.status) {
    case 'pending':
      return (
        <Fab
          onClick={() => handleModalOpen(row)}
          size="medium"
          color="primary"
          aria-label="edit"
        >
          <EditIcon />
        </Fab>
      );
    case 'approved':
      return (
        <Button
          style={{
            width: '120px',
            backgroundColor: green[500],
            color: 'black',
          }}
          variant="contained"
          disabled
        >
          Approved
        </Button>
      );
    case 'declined':
      return (
        <Button
          style={{
            width: '120px',
            backgroundColor: orange[600],
            color: 'black',
          }}
          variant="contained"
          disabled
        >
          Declined
        </Button>
      );
    default:
      return <div />;
  }
};

export default showStatus;
