export const constant = {
  sidebarDemoLinks: [
    {
      label: "Dashboard",
      link: "/home/dashboard/",
      faIcon: "fa fa-tachometer",
      externalRedirect: false
    },
    // {
    //   label: "Report upload",
    //   faIcon: "fa fa-upload",
    //   items: [
    //     {
    //       label: "Input file",
    //       icon: "backup",
    //       link: "home/upload"
    //     },
    //     {
    //       label: "Static file",
    //       link: "home/staticfilesupload",
    //       icon: "library_books",
    //       activeIcon: "favorite"
    //     }
    //   ]
    // },
    {
      label: "Report upload",
      faIcon: "fa fa-upload",
      items: [
        {
          label: "Upload file",
          icon: "backup",
          link: "home/uploadfile"
        },
        {
          label: "OSReport",
          icon: "backup",
          link: "home/osreport"
        },
        {
          label: "SummaryReport",
          icon: "backup",
          link: "home/summaryreport"
        },
        {
          label: "Static file",
          link: "home/staticfilesupload",
          icon: "library_books",
          activeIcon: "favorite"
        }
      ]
    },
    {
      label: "DSO",
      icon: "save_alt",
      items: [
        {
          label: "DSORegion",
          link: "home/dsodata",
          icon: "assignment_returned"
        }
      ]
    },
    {
      label: "Code breakdown",
      link: "/home/codebreakdown/",
      icon: "device_hub",
      externalRedirect: false
    },
    {
      label: "test",
      link: "/home/test/",
      faIcon: "fa fa-tachometer",
      externalRedirect: false
    },
  ],
  sidebarConfigurations: {
    paddingAtStart: true,
    interfaceWithRoute: true,
    rtlLayout: false,
    collapseOnSelect: true,
    highlightOnSelect: true,
    // fontColor: `rgb(8, 54, 71)`,
    classname: "active-amml-item"
  }
};
