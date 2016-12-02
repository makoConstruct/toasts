
class Toasts{
	defaults:any
	generate:(msg:string, config:any, invokeDestruction:()=>void)=> any;
	constructor(cfg:any = {});
	post(msg:string, config:any = {}):()=>void;
}

export = Toasts