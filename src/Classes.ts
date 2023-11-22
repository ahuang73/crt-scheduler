
export class ShiftType {
        _id: number | string;
        Name: string;
        PrimaryReq: number;
        SecondaryReq: number;
        CriticalTime: string;
        HoursTaken: string;
        NaughtyList: string;
        IsDefault: boolean;
    
        constructor(
            _id: number | string,
            Name: string,
            PrimaryReq: number,
            SecondaryReq: number,
            CriticalTime: string,
            HoursTaken: string,
            NaughtyList: string,
            IsDefault: boolean
        ) {
            this._id = id;
            this.Name = Name;
            this.PrimaryReq = PrimaryReq;
            this.SecondaryReq = SecondaryReq;
            this.CriticalTime = CriticalTime;
            this.HoursTaken = HoursTaken;
            this.NaughtyList = NaughtyList;
            this.IsDefault = IsDefault;
        }
    }

  
export class Responder {
    id: string;
    username: string;
    name: string;
    supervisor: string;
    training: string;
    debrief: string;
    anp: string;
    regular: string;
    position: string;
    SFAexpiry: Date;
    BLSexpiry: Date;
    FRexpiry: Date;
    certExpiration: string;

    constructor(data: any) {
        this.id = data._id.$oid;
        this.username = data.username;
        this.name = data.name;
        this.supervisor = String(data.supervisor);
        this.training = data.training;
        this.debrief = data.debrief;
        this.anp = data.anp.$numberInt;
        this.regular = data.regular.$numberInt;
        this.position = data.position;
        this.SFAexpiry = new Date(data.SFAexpiry);
        this.BLSexpiry = new Date(data.BLSexpiry);
        this.FRexpiry = new Date(data.FRexpiry);
        this.certExpiration = this.getCertExpiration()
    }
    getCertExpiration(): string {
        const dates: Date[] = [this.SFAexpiry, this.BLSexpiry, this.FRexpiry];
        const earliestDate = dates.reduce((a, b) => a < b ? a : b);
        const today = new Date();
        const timeDiff = Math.abs(earliestDate.getTime() - today.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return `${diffDays} days`;
    }
}