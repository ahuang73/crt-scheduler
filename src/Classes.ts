
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
        this._id = _id;
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
    _id: string;
    Username: string;
    Name: string;
    Supervisor: number;
    Training: number;
    Debrief: number;
    Anp: number;
    Regular: number;
    Position: string;
    SFAexpiry: Date;
    BLSexpiry: Date;
    FRexpiry: Date;
    CertExpiration: string;
    isAdmin: boolean;
    isSuspended:boolean;
    constructor(data: any) {
        this._id = data._id;
        this.Username = data.Username;
        this.Name = data.Name;
        this.Supervisor = data.Supervisor
        this.Training = data.Training;
        this.Debrief = data.Debrief;
        this.Anp = data.Anp;
        this.Regular = data.Regular;
        this.Position = data.Position;
        this.SFAexpiry = new Date(data.SFAexpiry);
        this.BLSexpiry = new Date(data.BLSexpiry);
        this.FRexpiry = new Date(data.FRexpiry);
        this.CertExpiration = this.getCertExpiration()
        if(data.isAdmin == undefined){
            this.isAdmin = false;
        }
        else{
            this.isAdmin = data.isAdmin;
        }
        if(data.isSuspended == undefined){
            this.isSuspended = false;
        }
        else{
            this.isSuspended = data.isSuspended;
        }

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
export class Shift {
    public _id: string;
    public Date: string;
    public Name: string;
    public Location: string;
    public Primary: string;
    public Secondary: string;
    public Rookie: string;
    public Type: string;
    public End: string;
    public Start: string;
    public TotalHours: number;

    constructor(shiftData: {
        _id: string;
        Date: string;
        Name: string;
        Location: string;
        Primary: string;
        Secondary: string;
        Rookie: string;
        Type: string;
        End: string;
        Start: string;
    }) {
        this._id = shiftData._id;
        this.Date = shiftData.Date;
        this.Name = shiftData.Name;
        this.Location = shiftData.Location;
        this.Primary = shiftData.Primary;
        this.Secondary = shiftData.Secondary;
        this.Rookie = shiftData.Rookie;
        this.Type = shiftData.Type;
        this.End = shiftData.End;
        this.Start = shiftData.Start;
        const start = new Date(`1970-01-01T${this.Start}:00`);
        const end = new Date(`1970-01-01T${this.End}:00`);
       
        // Calculate the time difference in milliseconds
        const timeDifference = end.getTime() - start.getTime();
        
        // Convert the time difference to hours
        const totalHours = timeDifference / (1000 * 60 * 60);
        this.TotalHours=totalHours;
    }

    public calculateTotalHours(startTime: string, endTime: string): number {
        // Assuming startTime and endTime are in HH:mm format
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
       
        // Calculate the time difference in milliseconds
        const timeDifference = end.getTime() - start.getTime();
        
        // Convert the time difference to hours
        const totalHours = timeDifference / (1000 * 60 * 60);
        
        // Return the total hours as a number
        return totalHours;
    }
}

export class User{
    public username: String;
    public email: String;

    constructor(username: String, email: String){
        this.username = username;
        this.email = email;
    }

    
}