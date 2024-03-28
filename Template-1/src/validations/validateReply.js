const validateReply = (reply,validations)=>{
    if(validations.emailCheck){
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!mailFormat.test(reply)) return false;
    }
    if(validations.phoneNumber){
        const phoneNumber = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}|(\+44\s?20\d{2})\s?\d{4}|(\+44\s?[1-9]{1}\d{2})\s?\d{3}\s?\d{4}$/;
        if(!phoneNumber.test(reply)) return false;
    }
    if(validations.onlyAlphabet){
        const onlyAlphabetFormat=/^[a-zA-Z ]*$/; 
        if(!onlyAlphabetFormat.test(reply)) return false;
    }
    if(validations?.date?.active){
        const {min,max} = validations?.date
        var dateFormat = new RegExp('^' + min + '$|^' + max + '$|^(' + min + ')(?!.*\\1)(?:|(?!\\1)(?:\\d{2}(?!\\d)|[-/.])(?:0?[1-9]|1[0-2])(?:[-/.])(?:\\d{4}))(?!.*' + max + ')|^(?:(' + min + ')(?!.*\\1)(?:|(?!\\1)(?:\\d{2}(?!\\d)|[-/.])(?:0?[1-9]|1[0-2])(?:[-/.])(?:\\d{4}))(?:.*))?((?<=\\2).*)?$');
        // const dateFormat=/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/; 
        if(!dateFormat.test(reply)) return false;
    }
    if(validations.YesOrNo){
        const YesOrNoFormat=/^(?:yes|no)$/; 
        if(!YesOrNoFormat.test(reply.toLowerCase())) return false;
    }
    if(validations?.number?.active){
        const numberPattern = new RegExp(`^(?:${validations?.number?.min}|${[...Array(validations?.number?.max - validations?.number?.min - 1)].map((_, i) => validations?.number?.min + i + 1).join('|')}|${validations?.number?.max})$`);
        if(!numberPattern.test(reply)) return false;
    }
    if(validations?.options?.active){
        const optionsPattern =  /^[a-d]$/i;
        if(!optionsPattern.test(reply)) return false;
    }
    if(validations.varchar){
        const varcharFormat =  /^[a-zA-Z0-9!@#$%^&*()_+={[}\]|\\:;"'<,>.?/`\s£€-]*$/;
        if(!varcharFormat.test(reply)) return false;
    }
    
    return true;
}
module.exports = validateReply;