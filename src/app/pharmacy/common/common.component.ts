import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, RequiredValidator} from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { namespaceMathML } from '@angular/core/src/render3';
import { Router,ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  CommonDataForm: FormGroup; 
  nodata:boolean=false;

  submitted =false;
  table: any;
  id: any;
  unitofstrenth:boolean;
  dosageforme:boolean;
  routeadmin:boolean;
  volumes:boolean;
  unitvolumes:boolean;
  Packagetype:boolean;
  Stroagecondation:boolean;
  Countrymanufature:boolean;
  Marketingcompany:boolean;
  Nationality:boolean;
  agentname:boolean;
  name: string;
  constructor(private formBuilder:FormBuilder,private http:Http,private router:Router,private route:ActivatedRoute) {

     }

  ngOnInit() {
   
    $('#update').hide();
    $('#unitupdateupdate').hide();
    $('#save1').hide();
    $('#save2').hide();
    $('#save3').hide();
    $('#save4').hide();
    $('#save5').hide();
    $('#save6').hide();
    $('#save7').hide();
    $('#save9').hide();
    $('#save10').hide();
    $('#save11').hide();
    $('#save12').hide();

    $('#update2').hide();
    $('#update3').hide();
    $('#update4').hide();
    $('#update5').hide();
    $('#update6').hide();
    $('#update7').hide();
    $('#update9').hide();
    $('#update10').hide();
    $('#update11').hide();
    $('#update12').hide();
    this.route.paramMap.subscribe(params =>{
      this.name=(params.get('name'));
      if(this.name=='unitofstrenth'){
          this.unitofstrenth=true;
          $('#save1').show();
          $('#save').hide()
          this.unitstrenth()
      }
      else{
        $('#save').hide()
        
        this.unitofstrenth=false;
      }
      if(this.name=='dosageform'){
      
        $('#save2').show();
        $('#save1').hide();
          $('#save').hide()
        this.dosageforme=true;
        this.dosagegrid()
      }
      else{
        this.dosageforme=false
      }
      if(this.name=='routeadmin'){
        $('#save3').show();
        this.routadmingrid()
        this.routeadmin=true;
      }
      else{
        this.routeadmin=false;
      }
      if(this.name=='Volume'){
        $('#save4').show();
      this.volumes=true
      this.volumegrid()
      }
      else{
        this.volumes=false
      }
      if(this.name=='unitvolume'){
        $('#save5').show();
        this.unitvolumes=true;
        this.unitvolumegrid();
      }
      else{
        this.unitvolumes=false
      }
      if(this.name=='Packagetype'){
        $('#save6').show();
      this.Packagetype=true;
      this.packagetypegrid()
      }else{
       this.Packagetype=false
      }
      if(this.name=='stroagecondation'){
        $('#save7').show();
      this.Stroagecondation=true;
      this.storagegrid();
      }else{
        this.Stroagecondation=false;
      }
      if(this.name=='countrymanufature'){
        this.Countrymanufature=true;
        $('#save9').show();
        this.countrymanufaturegrid()
      }else{
        this.Countrymanufature=false;
      }
      if(this.name=='Marketingcompany'){
        this.Marketingcompany=true;
        this.marketingcompanygrid();
        $('#save10').show();
      }else{
        this.Marketingcompany=false;
      }
      if(this.name=='Nationality'){
      this.nationalitygrid();
      this.Nationality=true;
      $('#save11').show();
      }else{
        this.Nationality=false;
      }
      if(this.name=='agentname'){
this.agentname=true;
this.Agentgrid();
$('#save12').show();
      }else{
        this.agentname=false;
      }
     

    })




    this.CommonDataForm = this.formBuilder.group({
      ArabicName: ['', Validators.required],
      EnglishName: ['', Validators.required]

  });
 
   //this.getcommondata()
 
  }
  viewurinalreport(name){
    this.router.navigate(['/commonunit',name]);
  }

  getcommondata(){					
    let body={ }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });

    let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/0'

    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      this.table=res.data

    }
    
    })

    }   

  get f() { return this.CommonDataForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.CommonDataForm.invalid) {
        return;
    }

    //alert('SUCCESS!! :-)')
}

insertdata(){
  

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'0'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.CommonDataForm.reset();
    this.getcommondata()
  }
  
  })

							
							
}
edit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save').hide()
    $('#update').show()

  
  }
  
  })
 
}

update(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'0'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save').show()
    $('#update').hide()
    this.getcommondata()
  }
  
  })
}
//unit strenth//
unitinsertdata(){
  

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'1'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    
    this.unitstrenth()
  }
  
  })

							
							
}
unitupdate(){
  alert(this.id)
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'1'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save1').show()
    $('#unitupdateupdate').hide()
    this.unitstrenth()
  }
  
  })
}

unitedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save1').hide()
    $('#save').hide()
    $('#unitupdateupdate').show()

  
  }
  
  })
 
}
unitstrenth(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/1'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    }
    
    })
}
unitdeletedata(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.unitstrenth();
    }
    
    })
  }
}
///end unit strenth



//dosageform
dosageform(name){
  this.router.navigate(['/commondosageform',name]);
}
dosagegrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/2'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    this.nodata=false;
    }
    else{
      this.nodata=true;
    }
  })
}


dosageinsertdata(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'2'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.dosagegrid()
  }
  
  })

							
							
}
dosageedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save1').hide()
    $('#save').hide()
    $('#save2').hide()
    $('#update2').show()
  
  
  }
  
  })
 
}

dosageupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'2'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save2').show()
    $('#update2').hide()
    $('#unitupdateupdate').hide()
    this.dosagegrid()
  }
  
  })
}
dosagedeletedata(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.dosagegrid()
    }
    
    })
  }
}




//end dosage form




//route admination//
routeadmination(name){
  this.router.navigate(['/commonrouteadmin',name]);
}

routadmingrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/3'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    }
  })
}
routeadmininsertdata(){
  
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'3'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.routadmingrid()
  }
  
  })

							
							
}
routeadminedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save1').hide()
    $('#save3').hide()
    $('#update3').show()

  
  }
  
  })
 
}
routeadminupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'3'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save3').show()
    $('#update3').hide()
    $('#unitupdateupdate').hide()
    this.routadmingrid()
  }
  
  })
}
routeadmindeletedata(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.routadmingrid()
    }
    
    })
  }
}
//route admination end.......//


//..............volume start.............//
volume(name){
  this.router.navigate(['/commonvolume',name]);
}
volumegrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/4'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    }
  })
}

volumeinsertdata(){
  

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'4'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.volumegrid()
  }
  
  })

							
							
}
volumeedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save1').hide()
    $('#save4').hide()
    $('#update4').show()

  
  }
  
  })
 
}
volumeupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'4'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save4').show()
    $('#update4').hide()
    $('#unitupdateupdate').hide()
    this.volumegrid()
  }
  
  })
}
volumedelete(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.volumegrid()
    }
    
    })
  }
}

//..............volume end.............//




//................unitvolime start...............//
unitvolume(name){
  this.router.navigate(['/commonunitvolume',name]);
}
unitvolumegrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/5'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    }
  })
}
unitvolumeinsertdata(){
  
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'5'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.unitvolumegrid()
  }
  
  })

							
							
}
unitvolumeedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save5').hide()
    $('#update5').show()

  
  }
  
  })
 
}
unitvolumeupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'5'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save5').show()
    $('#update5').hide()
    $('#unitupdateupdate').hide()
    this.unitvolumegrid()
  }
  
  })
}
unitvolumedelete(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.unitvolumegrid()
    }
    
    })
  }
}

//................unitvolume end...............//

//................Package type start...............//
packagetype(name){
  this.router.navigate(['/commonpackagetype',name]);
}
packagetypegrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/6'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    }
  })
}
packagetypeinsertdata(){
  
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'6'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.packagetypegrid()
  }
  
  })

							
							
}
packagetypeedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save6').hide()
    $('#update6').show()

  
  }
  
  })
 
}
packagetypeupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'6'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save6').show()
    $('#update6').hide()
  
    this.packagetypegrid()
  }
  
  })
}
packagetypedelete(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.packagetypegrid()
    }
    
    })
  }
}


//................Package type end...............//


//..............stroagecondation start.....//////
stroagecondation(name){
  this.router.navigate(['/commonpackagetype',name]);
}
storagegrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/7'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    }
  })
}
storageinsertdata(){
  
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'7'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.storagegrid()
  }
  
  })

							
							
}
storageedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save7').hide()
    $('#update7').show()

  
  }
  
  })
 
}
storageupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'7'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save7').show()
    $('#update7').hide()
    this.storagegrid()
  }
  
  })
}
stroagedelete(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.storagegrid()
    }
    
    })
  }
}
//..............stroagecondation end.....//////

//..............manufaturecountry start.....//////
countrymanufature(name){
  this.router.navigate(['/commoncountryManufature',name]);
}
countrymanufaturegrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/9'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    }
  })
}
countrymanufatureinsertdata(){
  
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'9'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.countrymanufaturegrid()
  }
  
  })

							
							
}
countrymanfatureedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save9').hide()
    $('#update9').show()

  
  }
  
  })
 
}
countrymanufatureupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'9'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save9').show()
    $('#update9').hide()
    this.countrymanufaturegrid()
  }
  
  })
}
countrymanufaturedelete(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.countrymanufaturegrid()
    }
    
    })
  }
}
//..............manufaturecountry end.....//////

//..............marketingcomapny start.....//////
marketingcompany(name){
  this.router.navigate(['/commonMarketingcompany',name]);
}
marketingcompanygrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/10'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    this.nodata=false;
    }
    else{
      this.nodata=true;
    }
  })
}
marketingcompanyinsertdata(){
  
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'10'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.marketingcompanygrid()
  }
  
  })

							
							
}
marketingcompanyedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save10').hide()
    $('#update10').show()

  
  }
  
  })
 
}
marketingcompanyupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'10'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save10').show()
    $('#update10').hide()
    this.marketingcompanygrid()
  }
  
  })
}
marketingcompanydelete(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.marketingcompanygrid()
    }
    
    })
  }
}

//..............marketingcompany end.....//////

//..............nationality start.....//////

nationality(name){
  this.router.navigate(['/commonNationality',name]);
}
nationalitygrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/11'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    this.nodata=false;
    }
    else{
      this.nodata=true;
    }
  })
}
nationalityinsertdata(){
  
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'11'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.nationalitygrid()
  }
  
  })

							
							
}

nationalityedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save11').hide()
    $('#update11').show()

  
  }
  
  })
 
}
nationalityupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'11'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save11').show()
    $('#update11').hide()
    this.nationalitygrid()
  }
  
  })
}
nationalitydelete(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.nationalitygrid()
    }
    
    })
  }
}
//..............nationality end.....//////

//..............Agent name start.....//////
Agentname(name){
  this.router.navigate(['/commonAgentname',name]);
}
Agentgrid(){
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/12'
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
    this.table=res.data;
    this.nodata=false;
   
    }
    else{
      this.nodata=true;
     
    }
  })
}
agentnameinsertdata(){
  
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/add-new-Common'
  let body={ 
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'12'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Inserted Data')
    this.submitted=false
    this.CommonDataForm.reset();
    this.Agentgrid()
  }
  
  })

							
							
}
agentnameedit(id){
  this.id=id
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/get-Common-by-id/'+this.id;
  let body={ 
    		
  }
  console.log(body)
  this.http.post(url,options).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    this.CommonDataForm.patchValue({
      ArabicName:res.data.NameAr,
      EnglishName: res.data.NameEn
    })
    $('#save12').hide()
    $('#update12').show()

  
  }
  
  })
 
}
agentupdate(){

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let options = new RequestOptions({ headers: headers });

  let url='https://api.oclinico.com/PharmacyAPI/api/common/update-Common'							
							
  let body={
    'ID' :this.id,
    'NameAr':this.CommonDataForm.value.ArabicName	,
    'NameEn':this.CommonDataForm.value.EnglishName	,		
    'ParentID':'12'			
  }
  console.log(body)
  this.http.post(url,body).map(res => res.json()).subscribe(res=>{
  console.log(res)
  if(res.Result==true){
    alert('Sucssfully Updated')
    this.CommonDataForm.reset();
    this.submitted=false
    $('#save12').show()
    $('#update12').hide()
    this.Agentgrid()
  }
  
  })
}
agentdelete(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      
      alert('Sucssfully Deleted Data')
      this.Agentgrid()
    }
    
    })
  }
}

//..............Agent end.....//////

//..............legalstatus start.....//////
legalstatus(name){
  this.router.navigate(['/commonlegalstatus',name]);
}


//..............legalstatus end.....//////

deletedata(id){
  var result = confirm(" Are you sure you want to delete");
  if (result == true) {
 
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
  
    let url='https://api.oclinico.com/PharmacyAPI/api/common/delete-Common/'+id
    
    
    this.http.post(url,options).map(res => res.json()).subscribe(res=>{
    console.log(res)
    if(res.Result==true){
      alert('Sucssfully Deleted Data')
      this.getcommondata();
    }
    
    })
  }
}


}
