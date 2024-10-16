

export async function handleChangeClickAPI( event, setProfilePic, setProfilePicUrl ) {
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);

    const fileURL = URL.createObjectURL(selectedFile);
    console.log("temp file in api :",fileURL);

    setProfilePicUrl(fileURL)
    
}

