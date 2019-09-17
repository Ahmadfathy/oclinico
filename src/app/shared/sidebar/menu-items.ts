import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { RouteInfo, SIGNLEInfo, DOCTORInfo, PharmasistInfo, ReceptionistInfo, LabtechistInfo } from './sidebar.metadata';
import { maybeQueueResolutionOfComponentResources } from '@angular/core/src/metadata/resource_loading';


export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    rtltitle: 'لوحة التحكم',
    icon: 'icon-Car-Wheel',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/clinicinfo',
    title: 'Clinic Info',
    rtltitle: 'معلومات العيادة',
    icon: 'icon-Stethoscope',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Appointments',
    title: 'Appointments',
    rtltitle: 'مواعيد',
    icon: 'icon-Tablet',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/all',
        title: 'All',
        rtltitle: 'الكل',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/add',
        title: 'Add',
        rtltitle: 'إضافة',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/todays',
        title: 'Todays',
        rtltitle: 'اليوم',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/upcoming',
        title: 'Upcoming',
        rtltitle: ' المسمى الوظيفي',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/calendar',
        title: 'Calendar',
        rtltitle: 'التقويم',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/request',
        title: 'Request',
        rtltitle: ' المسمى الوظيفي',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '/autocomplate',
    title: 'Patient Details',
    rtltitle: 'تفاصيل المريض ',
    icon: 'icon-Waiter',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Maininvoice',
    // path: '',
    title: 'Invoices',
    rtltitle: ' الفواتير',
    icon: 'icon-Note',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/getpayment',
    // path: '',
    title: 'Payments',
    rtltitle: 'المدفوعات ',
    icon: 'icon-Coin',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Laboratary',
    title: 'laboratary',
    rtltitle: 'مختبر',
    icon: 'icon-Blood',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/radiology',
    title: 'Radiology',
    rtltitle: 'الأشعة‎',
    icon: 'icon-Bone',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Pharmacy',
    title: 'Pharmacy',
    rtltitle: 'الصيدلية ',
    icon: 'icon-Add',
    class: '',
    extralink: false,
    submenu: [
      {
        path: '/products',
        title: 'Medication',
        rtltitle: 'الكل',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/manufature',
        title: 'Manufature',
        rtltitle: 'المصنع والمورد',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/stores',
        title: 'Stores',
        rtltitle: 'المخازن',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/common',
        title: 'Common',
        rtltitle: 'البيانات المشتركه',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
    ]
  },
  {
    path: '/erpatientinfo',
    title: 'ER',
    rtltitle: ' الطوارئ',
    icon: 'icon-Ambulance',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/wards',
    title: 'Wards',
    rtltitle: 'جناح المستشفى',
    icon: 'icon-Clinic',
    class: '',
    extralink: false,
    submenu: []
  },

  {
    path: '/daypatientinfo',
    title: 'Day Surgery',
    rtltitle: ' جراحة اليوم الواحد ',
    icon: 'icon-Calendar-3',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/product',
    title: 'Products',
    rtltitle: ' المنتجات',
    icon: 'icon-Medicine-2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/expenses',
    title: 'Expenses',
    rtltitle: 'مصاريف ',
    icon: 'icon-Wallet-2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/reports',
    title: 'Reports',
    rtltitle: ' تقارير',
    icon: 'icon-Bar-Chart3',
    class: '',
    extralink: false,
    submenu: []
  },


  {
    path: '',
    title: 'User Management',
    rtltitle: 'إدارة المستخدم ',
    icon: 'icon-Administrator',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/jobtitle',
        title: 'Job Title',
        rtltitle: ' المسمى الوظيفي',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/usercreate',
        title: 'User Creation',
        rtltitle: 'إنشاء مستخدم ',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/manageuser',
        title: 'Manage User',
        rtltitle: 'ادارة المستخدمين',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/loginactivity',
        title: 'Login Activities',
        rtltitle: 'مثالا على',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '/Communication',
    title: 'Communications',
    rtltitle: ' التواصل',
    icon: 'icon-Business-Mens',
    class: '',
    extralink: false,
    submenu: []
  },

  {
    path: '/settings',
    title: 'Settings',
    rtltitle: 'إعدادات ',
    icon: 'icon-Gear',
    class: '',
    extralink: false,
    submenu: []
  },


  // {
  //   path: '',
  //   title: 'Authentication',
  //   rtltitle: 'مثالا على',
  //   icon: 'icon-Administrator',
  //   class: 'has-arrow',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: '/login',
  //       title: 'Login',
  //       rtltitle: 'مثالا على',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/signup',
  //       title: 'Register',
  //       rtltitle: 'مثالا على',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/404',
  //       title: '404',
  //       rtltitle: 'مثالا على',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     }
  //   ]
  // }
]



export const SINGLEROUTES: SIGNLEInfo[] = [
  {
    path: '/generalsettings',
    title: 'General Settings',
    rtltitle: '',
    icon: 'icon-Gear',
    class: '',
    extralink: false,
    submenu: []
  }

]

export const DOCTORSROUTES: DOCTORInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    rtltitle: 'لوحة التحكم',
    icon: 'icon-Car-Wheel',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Appointments',
    title: 'Appointments',
    rtltitle: 'مواعيد',
    icon: 'icon-Tablet',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Patientinfo',
    title: 'Patient Details',
    rtltitle: 'تفاصيل المريض ',
    icon: 'icon-Waiter',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Maininvoice',
    title: 'Invoices',
    rtltitle: ' الفواتير',
    icon: 'icon-Note',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/getpayment',
    title: 'Payments',
    rtltitle: 'المدفوعات ',
    icon: 'icon-Coin',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/product',
    title: 'Products',
    rtltitle: ' المنتجات',
    icon: 'icon-Medicine-2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Communication',
    title: 'Communications',
    rtltitle: ' التواصل',
    icon: 'icon-Business-Mens',
    class: '',
    extralink: false,
    submenu: []
  }

]
export const PharmasistROUTES: PharmasistInfo[] = [
  {
    path: '/patientsummery',
    title: 'Patient Summery',
    rtltitle: 'تفاصيل المريض ',
    icon: 'icon-Waiter',
    class: '',
    extralink: false,
    submenu: []
  }

]
export const ReceptionistROUTES: ReceptionistInfo[] = [
  {
    path: '/Appointments',
    title: 'Appointments',
    rtltitle: 'مواعيد',
    icon: 'icon-Tablet',
    class: '',
    extralink: false,
    submenu: []
  }

]
export const LabtechistROUTES: LabtechistInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    rtltitle: 'لوحة التحكم',
    icon: 'icon-Car-Wheel',
    class: '',
    extralink: false,
    submenu: []
  }

]