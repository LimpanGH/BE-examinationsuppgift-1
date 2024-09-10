//! Querys --------------------------

//todo Find by Id
// query {
//     product(id: "66d1f4c40d2b68ae999be27e") {
//       name
//     }
//   }

//todo List names of all products
// query {
//     products {
//       name

//     }
//   }

//todo Get low stock products
// {
//     lowStockProducts {
//       id
//       amountInStock
//     }
//   }

//todo list all unique manufacturers 
// query{uniqueManufacturers {
//     totalManufacturersCount
//     manufacturers {
//       name   
//     }
//   }}

//todo Get critical stock products
// {
//     criticalStockProducts {
//       name
//       manufacturerName
//       contactName
//       contactPhone
//       contactEmail
//       amountInStock
//     }
//   }

//! Mutation add product -----------------------

//todo Get addProduct
// mutation {
//     addProduct(
//       name: "Tjoflöjt",
//       sku: 12345,
//       description: "Detta är en beskrivning av produkten.",
//       price: 199.99,
//       category: "Elektronik",
//       manufacturerName: "Webber",
//       manufacturerCountry: "CountryName",
//       manufacturerWebsite: "http://example.com",
//       manufacturerDescription: "Manufacturer description",
//       manufacturerAddress: "Manufacturer address",
//       contactName: "Contact Name",
//       contactEmail: "contact@example.com",
//       contactPhone: "123-456-7890",
//       amountInStock: 3
//     ) {
//       id
//       name
//       sku
//       description
//       price
//       category
//       manufacturer {
//         name
//         country
//         website
//         description
//         address
//         contact {
//           name
//           email
//           phone
//         }
//       }
//       amountInStock
//     }
//   }
