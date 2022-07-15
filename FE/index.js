const clintIo = io("http://localhost:3000")


// clintIo.emit("updateSocketID" , 'f_0m3GQK9MFcV4NRAAAB' )


// clintIo.on('reply', (data) => {
//     displayData(data)
// })



// function displayData(data) {
//     let products = '';
//     for (let i = 0; i < data.length; i++) {
//         products += `
//               <div class="col-md-4 my-2">
//               <div class="p-2">
//                   <div class="card text-center" style="width: 18rem;">
//                       <div class="card-body">
//                           <h5 class="card-title">${data[i].title}</h5>
//                           <p class="card-text">${data[i].descrption}</p>
//                           <p class="card-text">${data[i].price}</p>
//                           <p class="card-text">${data[i].createdBy}</p>
//                       </div>
//                   </div>
//               </div>
//           </div>
              
//               `
     

//     }
//     $(".data").html(products)
// }