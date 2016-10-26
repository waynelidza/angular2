export interface StdProvForm {
    projectName:string;
    name:string;
    oS:OS;
    Size:string;
    RootVolumeSize:number;
    additionalDisks :AdditionalDisk[];
    Subnet:string;
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

