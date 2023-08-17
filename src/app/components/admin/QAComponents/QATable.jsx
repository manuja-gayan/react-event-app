import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import QAForm from './QAForm';
import showStatus from './showStatusFunction';
import CopyToClipboard from './CopyToClipboard';

const useStyles = makeStyles(theme => ({
  customTable: {
    marginTop: theme.spacing(2),
    maxHeight: '70vh',
  },
}));

/**
 * QA Table
 *
 * @component
 */
function QATable({ filteredQuestions }) {
  const classes = useStyles();

  const [openQAFormState, setOpenQAFormState] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  const handleModalOpen = row => {
    setSelectedRecord(row);
    setOpenQAFormState(true);
  };

  const handleModelClose = () => setOpenQAFormState(false);
  return (
    <TableContainer className={classes.customTable}>
      <Table stickyHeader size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Question</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredQuestions.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                {row.email} <CopyToClipboard text={row.email} />
              </TableCell>
              <TableCell>
                {row.question} <CopyToClipboard text={row.question} />
              </TableCell>
              <TableCell align="center">
                {showStatus(row, handleModalOpen)}
              </TableCell>
              <Modal
                open={openQAFormState}
                onClose={handleModelClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                align="center"
              >
                <div>
                  <QAForm
                    question={selectedRecord}
                    handleModelClose={handleModelClose}
                  />
                </div>
              </Modal>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

QATable.propTypes = {
  filteredQuestions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default QATable;
