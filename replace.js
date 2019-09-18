const json = require("./convertcsv.json");
const fs = require("fs");
const vendorlist = require("./vendorslist.json");

const newVendors = json.map(
  ({
    FIELD1: vendor_category,
    FIELD2: supplier_id,
    FIELD3: company_name,
    FIELD4: address,
    FIELD5: location,
    FIELD6: contact_person,
    FIELD7: email,
    FIELD8: website_address,
    FIELD9: phone_number,
    FIELD10: classes
  }) => ({
    vendor_category,
    supplier_id,
    company_name,
    address,
    location,
    contact_person,
    email,
    website_address,
    phone_number,
    classes
  })
);

// console.log(newVendors);

const stringify = JSON.stringify(newVendors);

// fs.writeFile("vendorslist.json", stringify, err => {
//   if (err) throw err;
//   console.log("Saved!!!");
// });

const rewriteList = vendorlist.map(vendors => {
  const data = {
    user: "",
    general_info: {
      company_name: vendors.company_name,
      reg_no: "",
      office_address: vendors.address,
      city: vendors.location,
      coy_phone: vendors.phone_number,
      contact_name: vendors.contact_person,
      company_email: vendors.email,
      coy_email: vendors.email
    },
    business_info: {},
    bank_detail: {},
    work_reference: {},
    updated: new Date(),
    created: new Date()
  };
  return {
    ...data
  };
});

// console.log(rewriteList);
const stringify2 = JSON.stringify(rewriteList);
fs.writeFile("vendors2.json", stringify2, err => {
  if (err) throw err;
  console.log("Saved!!!");
});
