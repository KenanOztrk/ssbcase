import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddDataForm from './AddDataForm';

interface AddDataModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleOpenModal: (rowData:any) => void;
  selectedRow: any;
}

const AddDataModal : React.FC<AddDataModalProps>= ({isOpen, handleCloseModal, handleOpenModal, selectedRow }) => {

  

  return (
    <>

<div>
    <Button style={{
      float: 'right',
    }} variant="contained" onClick={handleOpenModal}>Add New Data</Button>
  </div>
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 6, width: 500 }}>
        <h2 className='formLabel' id="modal-modal-title">CREATE DATA</h2>
        <AddDataForm handleCloseModal={handleCloseModal} selectedRow={selectedRow} />
      </Box>
    </Modal>
    </>
   
  );
};

export default AddDataModal;
