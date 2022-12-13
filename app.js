//* ======================================================================
//*                 Checkout Page Solution
//*  map filter, dest,spread==============================================
//!table da kullanılacak değişkenler
const kargo = 15.0;
const vergi = 0.18;

let basket = [
  { name: "Vintage Backpack", price: 34.99, piece: 1, img: "./img/photo1.png" },
  { name: "Levi Shoes", price: 40.99, piece: 1, img: "./img/photo2.png" },
  { name: "Antique Clock", price: 69.99, piece: 1, img: "./img/photo3.jpg" },
];

//!EKRANA BASTIRMA
basket.forEach((product) => {
  //!DESTRUCTURİNG
  const { name, price, piece, img } = product;

  document.querySelector(
    "#product-rows"
  ).innerHTML += `<div class="card mb-3" style="max-width: 540px;">

  <div class="row g-0">

    <div class="col-md-5">
      <img src= ${img}  class="img-fluid rounded-start" alt="...">
    </div>

    <div class="col-md-7">

      <div class="card-body">
      
        <h5 class="card-title">${name}</h5>
        
             <div class="product-price">
                    <p class="text-warning h2">$
                      <span class="indirim-price">${(price * 0.7).toFixed(
                        2
                      )}</span>
                      <span class="h5 text-dark text-decoration-line-through">${price} </span>
                    </p>
                  </div>

                  
                  <div
                    class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2"
                  >
                    <div class="piece-controller">
                      <button class="btn btn-secondary btn-sm minus">
                        <i class="fas fa-minus"></i>
                      </button>
                      <p class="d-inline mx-4" id="product-piece">${piece}</p>
                      <button class="btn btn-secondary btn-sm">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>

                  </div>

                  <div class="product-removal mt-4">
                    <button class="btn btn-danger btn-sm w-100 remove-product">
                      <i class="fa-solid fa-trash-can me-2"></i>Remove
                    </button>
                  </div>

                  <div class="mt-2">
                    product Toplam: $<span class="product-toplam">${(
                      price *
                      0.7 *
                      piece
                    ).toFixed(2)}</span>
                  </div>
      </div>
    </div>
  </div>
</div>`;
});

//!SİLME
document.querySelectorAll(".remove-product").forEach((btn) => {
  btn.onclick = () => {
    removeDelete(btn);
  };
});

function removeDelete(btn) {
  //!ekrandan sildik
  //* btn.parentElement.parentElement.parentElement.parentElement.parentElement.remove()

  //?2. yol closest()= istediğiniz class isimli parentElement e kadar çıkar
  btn.closest(".card").remove();

  //!diziden sildik
  console.log(btn.closest(".card").querySelector("h5").textContent);

  basket = basket.filter(
    (product) =>
      product.name != btn.closest(".card").querySelector("h5").textContent
  );
  console.log(basket);
}

//!adet DEĞİŞTİRME

pieceButon();

//!todo browser da en alttaki total kısmı
document.querySelector("#pay-table").innerHTML = `<table class="table">
            <tbody>
              <tr class="text-end">
                <th class="text-start">Aratoplam</th>
                <td>$<span class="aratoplam">0.00</span></td>
              </tr>
              <tr class="text-end">
                <th class="text-start">Vergi(18%)</th>
                <td>$<span class="vergi">0.00</span></td>
              </tr>
              <tr class="text-end">
                <th class="text-start">Kargo</th>
                <td>$<span class="kargo">0.00</span></td>
              </tr>
              <tr class="text-end">
                <th class="text-start">Toplam</th>
                <td>$<span class="toplam">0.00</span></td>
              </tr>
            </tbody>
          </table>`;

//******************************** */
hesaplaCardTotal();

function pieceButon() {
  //!burada - piece ve + elementlerle işim olduğu için, mesela - ye basınca piece (kardeşi) değişsin istediğim için, minus a ulaşıp ona tıklanınca closest ile parent ına oradan da kardeşine ulaş eksilt diyebiliriz. ya da gerekli elementlerin parent ına ulaşıp çocuklarına adlar verip, artık o adlarla işlem yapabiliriz
  document.querySelectorAll(".piece-controller").forEach((kutu) => {
    const minus = kutu.firstElementChild;
    const piece1 = kutu.querySelector("#product-piece");

    minus.onclick = () => {
      //!minus piece değişimini ekrana bastır
      piece1.textContent = piece1.textContent - 1;

      //!sepettekiler de piece değişimini yapalım

      basket.map((product) => {
        if (
          product.name ==
          piece1.closest(".card").querySelector("h5").textContent
        ) {
          product.piece = Number(piece1.textContent);
        }
      });
      console.log(basket);
      //!product toplam ı ekrana bastırma (her product card ında var)
      piece1.closest(".row").querySelector(".product-toplam").textContent =
        piece1.closest(".row").querySelector(".indirim-price").textContent *
        piece1.textContent;
      //?????????????????????????????
      hesaplaCardTotal();

      //!eğer piece 1 iken tekrar minus a basılırsa o productü sil (minus butonu removeSil fonksiyonuna gitsin parent ını silsin)
      if (piece1.textContent < 1) {
        alert("Delete?");
        removeDelete(minus);
      }
    };

    //! plus a basınca minus a benzer işlemler
    const plus = kutu.lastElementChild;
    plus.onclick = () => {
      piece1.textContent = Number(piece1.textContent) + 1;
      //????????????????????????????????????BU KISIM HEM MİNUS HEM PLUS TA VAR FONKSİYON A ATILABİLİR
      //!diziyi güncelle
      basket.map((product) => {
        if (
          product.name ==
          piece1.closest(".row").querySelector(".card-title").textContent
        )
          product.piece = Number(piece1.textContent);
        console.log(basket);
      });
      //!product toplam ekrana bastırması. her productde olan toplam kısmı
      piece1.closest(".row").querySelector(".product-toplam").textContent = (
        piece1.closest(".row").querySelector(".indirim-price").textContent *
        piece1.textContent
      ).toFixed(2);
      hesaplaCardTotal();
    };
  });
}
//! Calculate and update card total values
function hesaplaCardTotal() {
  //! her bir card daki product toplam kısımları
  const productToplam = document.querySelectorAll(".product-toplam");

  //!  Bir NodeListnesne, bir belgeden çıkarılan düğümlerin bir listesidir

  //? araToplam= en alttaki tüm productler için vergi kargo hariç sepettekiler fiyatı
  //?Reduce tam olarak Array istiyor, nodelist yeterli değil

  //*önce hesapla sonra altta browser a (DOM) bastır
  //  console.log([...productToplam]);
  const araToplam = Array.from(productToplam).reduce(
    (acc, item) => acc + Number(item.textContent),
    0
  );
  const vergiPrice = araToplam * vergi;
  const shipping = araToplam > 0 ? kargo : 0;
  const cardTotal = araToplam + shipping + vergiPrice;

  document.querySelector(".aratoplam").textContent = araToplam.toFixed(2);
  document.querySelector(".vergi").textContent = vergiPrice.toFixed(2);
  document.querySelector(".kargo").textContent = shipping.toFixed(2);
  document.querySelector(".toplam").textContent = cardTotal.toFixed(2);
}
