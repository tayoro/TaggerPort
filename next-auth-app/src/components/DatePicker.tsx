import React from 'react'
import DateTimePicker from 'react-datetime-picker'


export default function DatePicker({register , id }: {register: any , id: string}) {
    return (
        <>
            <input {...register(`${id}`)} id={id} aria-label="Date and time" type="datetime-local" dateFormat="y-MM-dd h:mm:ss a" />
        </>
    )
}
