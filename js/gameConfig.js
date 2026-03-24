export class GameConfig {
  type = "default";
  constructor(type) {
    this.type = type;
    if (type === "default") {
      this.countriesUnionsHtml = `<div class="countries-unions"><div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country1">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country2">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country3">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country4">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country5">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country6">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country7">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
            <div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country8">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country9">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country10">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country11">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country12">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
            <div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country13">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country14">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country15">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country16">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
            <div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country17">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country18">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
             <div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country19">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country20">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
             <div style="margin-bottom: 3px; padding-top:3px; border-top: 1px dotted black;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px; background-color:orange;" class="country21">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px; background-color:orange;" class="country22">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
             <div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px; background-color:orange;" class="country23">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px; background-color:orange;" class="country24">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:10px; width:10px;"></span>
                </td>
              </tr>
            </table></div>
            </div></div>
            `;
      this.countriesTrapNumber = 4;
      this.countriesNumber = 20;
      this.countryUnionsNumber = 10;
      this.maxCountriesNumberInUnion = 4;
      this.hintsType = document.getElementById("hint-types-select").value;
      this.onlyIndependentCountries = document.getElementById(
        "only-independent-countries-select"
      ).value === "Independent Countries" ? true : false;
      this.hitTime = +document.getElementById("time-select").value;
      this.gameMode =
        document.getElementById("gameMode").value === "0" ? "computer" : "user";
    }
  }
}
