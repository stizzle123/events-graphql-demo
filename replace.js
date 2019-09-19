const json = require("./convertcsv.json");
const fs = require("fs");
const crypto = require("crypto");
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
// fs.writeFile("vendors2.json", stringify2, err => {
//   if (err) throw err;
//   console.log("Saved!!!");
// });

const vendorUserList = vendorlist.map(vendors => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync("password", salt, 1000, 64, "sha512")
    .toString("hex");
  const data = {
    email: vendors.email,
    role: "vendor",
    emailVerified: true,
    salt,
    hash,
    updated: new Date(),
    __v: 0
  };

  return {
    ...data
  };
});

const stringify3 = JSON.stringify(vendorUserList);

// fs.writeFile("vendorusers.json", stringify3, err => {
//   if (err) throw err;
//   console.log("SAVED!!!");
// });

const singleUser = () => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync("password", salt, 1000, 64, "sha512")
    .toString("hex");
  const data = {
    email:
      "michaelodunewu@advancelogisticservices.com; info@advancelogisticservic...",
    role: "vendor",
    emailVerified: true,
    salt,
    hash,
    updated: new Date(),
    __v: 0
  };
  return { ...data };
};

const stringify4 = JSON.stringify(singleUser());

fs.writeFile("singleUser.json", stringify4, err => {
  if (err) throw err;
  console.log("SAVED!!!!");
});
