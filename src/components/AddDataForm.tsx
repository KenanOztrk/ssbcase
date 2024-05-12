
import { useDispatch } from 'react-redux';
import { addPageData } from '../features/pagedataSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { PageData } from '../types/types';
import { useAddDataItemMutation } from '../helper/service';
import CustomButton from './CustomButton';



interface AddDataFormProps {
    handleCloseModal: () => void;
    selectedRow?: any;
}

const AddDataForm: React.FC<AddDataFormProps> = ({ handleCloseModal, selectedRow }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PageData>();
    const [checked, setChecked] = useState<boolean>(selectedRow?.isUpdatable || false);

  const [addDataItem] = useAddDataItemMutation();
  const [updateDataItem] = useAddDataItemMutation();
 
    
    const handleAddRecord = async (recordData: PageData) => {
        const { code, name, assignDate, isUpdatable } = recordData;
        const newRecord = {
            id: Math.floor(Math.random() * 10),
            code,
            name,
            assignDate,
            isUpdatable
        };

        try {
            await addDataItem(newRecord);
        } catch (error) {
            console.error('Failed to add record:', error);
        }
        dispatch(addPageData(newRecord));


        handleCloseModal();
    };

    const handleUpdateRecord = async (recordData: PageData) => {
        const { code, name, assignDate, isUpdatable } = recordData;
                const updatedRecord = {
            id: selectedRow.id,
            code,
            name,
            assignDate,
            isUpdatable
        };

        try {
            await updateDataItem(updatedRecord);
        } catch (error) {
            console.error('Failed to update record:', error);
        }

        handleCloseModal();
    };

    const onSubmit: SubmitHandler<PageData> = (data) => {
        selectedRow ? handleUpdateRecord(data) : handleAddRecord(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='formContainer'>
                    <label className='formLabel' htmlFor="code">Code</label>
                    <input
                    className='formInput'
                        type="text"
                        id="code"
                        title="Format: 2 letters followed by 3 digits"
                        defaultValue={selectedRow?.code}
                        {...register('code', {
                            required: 'This field is required',
                            pattern: {
                                value: /^[a-zA-Z]{2}[0-9]{3}$/,
                                message: 'Invalid code format (2 letters followed by 3 digits)',
                            },
                            maxLength: { value: 5, message: 'Maximum length is 5 characters' },
                        })}
                    />
                    {errors.code && <span className='formSpan'>{errors.code.message}</span>}
                </div>

                <div className='formContainer'>
                    <label className='formLabel' htmlFor="name">Name</label>
                    <input
                    className='formInput'
                        type="text"
                        id="name"
                        defaultValue={selectedRow?.name}
                        {...register('name', { required: 'This field is required',
                         maxLength: { value: 12, message: 'Maximum length is 12 characters' }
                        })}
                    />
                    {errors.name && <span className='formSpan'>{errors.name.message}</span>}
                </div>

                <div className='formContainer'>
                    <label className='formLabel' htmlFor="assignDate">Assign Date</label>
                    <input
                    className='formInput'
                        type="text"
                        id="assignDate"
                        title="Format: DD/MM/YYYY"
                        defaultValue={selectedRow?.assignDate}
                        {...register('assignDate', {
                            required: 'This field is required',
                            pattern: {
                                value: /^\d{2}\/\d{2}\/\d{4}$/,
                                message: 'Invalid date format (DD/MM/YYYY)',
                            },
                        })}
                    />
                    {errors.assignDate && <span className='formSpan' >{errors.assignDate.message}</span>}
                </div>

                <div >
                    <label className='formLabel' htmlFor="updatable">Is Updatable?</label>
                    <input
                        type="checkbox"
                        id="updatable"
                        checked={checked}
                        onClick={() => setChecked(!checked)}
                        {...register('isUpdatable')} />
                </div>
                <div className='bottomContainer'>
                    <div className='bottomContainerChild'>
                    <CustomButton 
                variant='outlined'
                label={selectedRow?.isUpdatable && checked ? 'Update' : 'Save'}
                onClick={handleSubmit(onSubmit)} />
                    <CustomButton 
                variant='outlined'
                label="Clean" 
                onClick={() => {
                    reset({ code: '', name: '', assignDate: ''});
                    setChecked(false);
                }} />
               
                    </div>
                    <div>
                    <CustomButton
                variant='outlined' 
                label="Close" 
                onClick={handleCloseModal} />
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddDataForm