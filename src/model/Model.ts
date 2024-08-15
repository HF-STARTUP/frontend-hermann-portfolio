import {differenceInDays, format, formatDistanceToNow} from "date-fns";

export const imageBaseUrl = `https://s3.us-west-2.amazonaws.com/images.vtccontrol.com`

abstract class Model {

    protected resolveImage(path: string | undefined | null) {
        return `${imageBaseUrl}/${path}`
    }

    protected toDate(date: Date, dateFormat: string = 'dd/MM/yyyy ') {
        return formatDistanceToNow(date)
    }

    public getDifferenceInDays(dateLeft: Date, dateRight: Date): number {
        return differenceInDays(dateLeft, dateRight);
    }

    protected capitalizeFirstLetter(sentence: string | undefined): string {
        if (sentence) {
            return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        }
        return sentence ?? '';
    }

    protected arroundNumb(nombre: number): string {
        const partieEntiere: number = Math.floor(nombre);
        const partieDecimal: string = (nombre - Math.floor(nombre)).toFixed(2).substring(1);
        return partieEntiere.toString() + partieDecimal;
    }
}

export default Model
