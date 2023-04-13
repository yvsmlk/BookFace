

export const getTimeStamp = ( date = new Date(),dateStyle='yyyy-mm-dd',delimiter="-"):string=>{

    function pad(number:number) {
        if ( number < 10 ) {
          return '0' + number;
        }
        return `${number}`;
    }

    const formatDate = (y:number,m:number,d:number,dateStyle='yyyy-mm-dd'):string=>{

        switch (dateStyle) {
            case "dd-mm-yyyy":
                return pad(d)+delimiter+pad(m)+delimiter+pad(y)

            case "dd-yyyy-mm":
                return pad(d)+delimiter+pad(y)+delimiter+pad(m)

            case "mm-yyyy-dd":
                return pad(m)+delimiter+pad(y)+delimiter+pad(d)

            case "mm-dd-yyyy":
                return pad(m)+delimiter+pad(d)+delimiter+pad(y)

            case "yyyy-dd-mm":
                return pad(y)+delimiter+pad(d)+delimiter+pad(m)
    
            default:
                return pad(y)+delimiter+pad(m)+delimiter+pad(d)
        }

    }

    let timeStamp = formatDate(date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),dateStyle )
    timeStamp += ' '
    timeStamp += pad( date.getUTCHours())
    timeStamp += ':'
    timeStamp += pad( date.getUTCMinutes())
    timeStamp += ':'
    timeStamp += pad( date.getUTCSeconds() ) 
    
    return timeStamp
}