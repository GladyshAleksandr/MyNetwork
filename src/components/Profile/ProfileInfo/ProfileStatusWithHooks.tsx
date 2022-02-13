import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import s from './ProfileInfo.module.css';

type  PropsType = {
    updateStatus: (status: string) => void
    status: string
}


const  ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

   /*  let stateWithSetState = useState(false);
    let editMode = stateWithSetState[0];
    let setEditMode = stateWithSetState[1]; */

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status] ); // теперь перерисовка зависит от props.status 

    const activateEditMode = () => {
        setEditMode(true);
    }

   const  deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    } 

   const  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
          setStatus(e.currentTarget.value);
    }

    return (
    <div>
        { !editMode && 
        <div>
            <b>Status: </b>  <span onDoubleClick={ activateEditMode} >{props.status || "------"}</span>
        </div>
        }

        { editMode && 
        <div>
            <input  autoFocus={true} onChange={onStatusChange} onBlur={ deactivateEditMode } value={status} ></input>
        </div>
        }
    </div>
    )
    }


export default ProfileStatusWithHooks;