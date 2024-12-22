import React from 'react'

export default function TimePicker({register , id }: {register: any , id: string }) {
    return (
        <>
            <input {...register(`${id}`)} id={id} aria-label="Time" type="time" />
        </>
    )
}
