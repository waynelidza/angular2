import { OS } from '../admin/OS';
import { Size } from '../admin/Size';
import { SubnetID } from '../admin/SubnetID';


export class ProvisioningOptions{

public OSArr:OS[] = [];
public  AdditionalDiskSizes : { [key:string]:string; } = {};
public SizeArr:Size[] = [];
public SubnetIDArr:SubnetID[] = [];
}









