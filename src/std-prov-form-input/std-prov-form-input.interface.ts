export interface StdProvForm {
    projectName:string;
    name:string;
    oS:OS;
    Size:Size;
    RootVolumeSize:number;
    additionalDisks :AdditionalDisk[];
    Subnet:SubnetID;
}

export interface AdditionalDisk  {
    size:number;
}

export class OS {

    public ID:string;
    public Description:string;
    public Defaultvalue:string;
    public MinRootVolSize:string;
}

export class Size {

    public ID:string;
    public Description:string;
    public Defaultvalue:string;
}

export class SubnetID {

    public ID:string;
    public Description:string;
    public Defaultvalue:string;
}



