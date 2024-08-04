"use client"
import React, {useEffect, useState} from 'react';
import {firestore} from "./firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

import { Box, Stack, Typography, Button, Modal,TextField } from "@mui/material"

//const item =['tomato','potato','onion','garlic','ginger','carrot','kale','califlower']

const style = {
  position:'absolute',
  top: '50%',
  left:'50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor:'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap:3,
}

export default function Home() {
  // We'll add our component logic here
  const [pantry, setPantry] = useState([])
  const [open,setOpen] = useState(false)
  const handleOpen = () => setOpen (true)
  const handleClose = ()  => setOpen(false)
  const [itemName, setItemName] = useState('')

  const updatePantry = async()=> {
    const snapshot = query(collection(firestore,'Pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
     docs.forEach((doc)=>{
      pantryList.push(doc.id)
    })
    
    setPantry(pantryList)
  }

  useEffect(() => {
    updatePantry()
  },[])
  
  const addItem = async (item) => {
    console.log('item',item)
    const docRef = doc(collection(firestore, 'Pantry'), item)

    // Check if exists
    const docSnap = await setDoc (docRef)
   
    //if (docSnap.exists()){
     // const {count} = docSnap.data()
     // await setDoc(docRef, {count: count +1})
   // }else{
     // await setDoc(docRef,{count:1})
   // }
   // await updatePantry()
  }

  const removeItem = async(item) => {
    const docRef = doc(collection(firestore, 'Pantry'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const{count} = docSnap.data()
      if (count ==1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef,{count:count-1}) 
      }
    } 
    await updatePantry()
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'} 
      flexDirection={'column'}
      alignItems={'center'}
      gap={2} 
    >
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
      <Box border={'1px solid #333'}></Box>
      <Box
        width="800px"
        height="100px"
        bgcolor={'#26619C'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={4}
      >
        <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
          Pantry Items
        </Typography>
        <Stack direction={'row'} spacing={2}>
          <TextField id="outlined-basic" label="Search" variant="outlined" />
        </Stack>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
        {pantry.map((name, count) => {
          
          return(
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'#f0f0f0'}
            paddingX = {5}
          >
            <Typography variant={'h3'} color={'#333'} textAlign={'center'} textTransform={'capitalize'}>
              {
                //Capitalize the first letter of the item
                name
              }
            </Typography>

            <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
              Quantity: {count}
            </Typography>

            <Button variant="contained" onClick={() => removeItem(name)}>
              Remove
            </Button>

          </Box>
          )})}
      </Stack>
    </Box>
  )
}