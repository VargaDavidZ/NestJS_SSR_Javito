import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { HolidayFormDto } from './holidayForm.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }


  @Get("/holidayForm")
  @Render('holidayForm')
  getFrom() {
    return {
      errors: [],
      data: {}
      //form data 
    }
  }


  @Post("/holidayForm")
  postFormData(@Body() item: HolidayFormDto, @Res() response: Response) {

    let errors = []
    console.log(item)

   
    let regex = /^[a-z]{3}-\d{3}$/

    if (item.name == "" || item.beginDate == "" || item.endDate == "" || item.empId == "" || item.reason == "") 
    {
      errors.push("Minden adatot meg kell adni")
    }
    else if (Date.parse(item.endDate) < Date.parse(item.beginDate)) {
      errors.push("A szabadság végét jelző dátum nem lehet a szabadság kezdete előtt ")
    }
    else if(!regex.test(item.empId.toLowerCase()))
    {
      errors.push("Helytelen alkalmazott azonosító")
    }
    else if(item.reason.length < 30)
    {
      errors.push("Az indoklásnak minim 30 karakterből kell állnia")
    }
    else
    {
      errors = []
    }


    if(errors.length == 0)
    {
     response.redirect("successfulFormInput",303)
    }
    else
    {
      response.render("holidayForm", {
        errors: errors,
        data:{
          name: item.name,
          beginDate: item.beginDate,
          endDate: item.endDate,

          empId: item.empId,
          reason: item.reason
        }
     


        

      })
    }



    console.log(errors)

  }


  @Get("successfulFormInput")
  @Render("successfulFormInput")
  getSuccess(){
    
  }











}
