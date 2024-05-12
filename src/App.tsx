
import { useState } from 'react';
import './App.css'
import { useAppSelector } from './app/hooks';
import AddDataModal from './components/AddDataModal';
import CustomDataGrid from './components/CustomDataGrid';
import { useGetDataListQuery } from './helper/service';
import CustomButton from './components/CustomButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';




const App: React.FC = () => {
  const columns = [
    { field: 'code', headerName: 'CODE', flex: 1},
    { field: 'name', headerName: 'NAME', flex: 2},
    { field: 'assignDate', headerName: 'ASSIGN DATE', flex: 1},
    { field: 'actions',
     headerName: 'ACTIONS',
     flex: 1,
      renderCell: (params: any) => (
        <>
      {params.row.isUpdatable && (
        <CustomButton color='inherit' icon={<EditOutlinedIcon />} onClick={() => handleOpenModal(params.row)} />
    
      )}
    </>
          ),
    },
   ];
   const { data, isSuccess } = useGetDataListQuery();
const pageData = useAppSelector((state) => state.pageData);
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
const [selectedRow, setSelectedRow] = useState<any>(null);


const handleOpenModal = (rowData: any) => {
  setSelectedRow(rowData);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
};


  return (
    <>
      <div>
        <h1>KOLAY Data Maker</h1>
        <AddDataModal isOpen={isModalOpen} handleCloseModal={handleCloseModal}  handleOpenModal={handleOpenModal} selectedRow={selectedRow} />
        <CustomDataGrid columns={columns} rows={isSuccess ? data : []} height={500}/>
      </div>
         </>
  )
}

export default App
