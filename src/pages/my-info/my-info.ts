import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html',
})
export class MyInfoPage {
  userInfo: any
  lang: any
  Languages: any[] = []
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getInfo()
    this.checkLang()
    this.prepareLanguages()
  }


  next() {
    this.navCtrl.setRoot('JoinMemberPage')
  }

  getInfo() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }


  prepareLanguages() {
    this.Languages = [
      {
        "Code": "af",
        "Language": "Afrikaans"
      },
      {
        "Code": "ar",
        "Language": "Arabic"
      },
      {
        "Code": "bn",
        "Language": "Bangla"
      },
      {
        "Code": "bs-Latn",
        "Language": "Bosnian (Latin)"
      },
      {
        "Code": "bg",
        "Language": "Bulgarian"
      },
      {
        "Code": "ca",
        "Language": "Catalan"
      },
      {
        "Code": "zh-CHS",
        "Language": "Chinese Simplified"
      },
      {
        "Code": "zh-CHT",
        "Language": "Chinese Traditional"
      },
      {
        "Code": "yue",
        "Language": "Cantonese (Traditional)"
      },
      {
        "Code": "hr",
        "Language": "Croatian"
      },
      {
        "Code": "cs",
        "Language": "Czech"
      },
      {
        "Code": "da",
        "Language": "Danish"
      },
      {
        "Code": "nl",
        "Language": "Dutch"
      },
      {
        "Code": "en",
        "Language": "English"
      },
      {
        "Code": "et",
        "Language": "Estonian"
      },
      {
        "Code": "fj",
        "Language": "Fijian"
      },
      {
        "Code": "fil",
        "Language": "Filipino"
      },
      {
        "Code": "fi",
        "Language": "Finnish"
      },
      {
        "Code": "fr",
        "Language": "French"
      },
      {
        "Code": "de",
        "Language": "German"
      },
      {
        "Code": "el",
        "Language": "Greek"
      },
      {
        "Code": "ht",
        "Language": "Haitian Creole"
      },
      {
        "Code": "he",
        "Language": "Hebrew"
      },
      {
        "Code": "hi",
        "Language": "Hindi"
      },
      {
        "Code": "mww",
        "Language": "Hmong Daw"
      },
      {
        "Code": "hu",
        "Language": "Hungarian"
      },
      {
        "Code": "is",
        "Language": "Icelandic"
      },
      {
        "Code": "id",
        "Language": "Indonesian"
      },
      {
        "Code": "it",
        "Language": "Italian"
      },
      {
        "Code": "ja",
        "Language": "Japanese"
      },
      {
        "Code": "sw",
        "Language": "Kiswahili"
      },
      {
        "Code": "tlh",
        "Language": "Klingon"
      },
      {
        "Code": "tlh-Qaak",
        "Language": "Klingon (pIqaD)"
      },
      {
        "Code": "ko",
        "Language": "Korean"
      },
      {
        "Code": "lv",
        "Language": "Latvian"
      },
      {
        "Code": "lt",
        "Language": "Lithuanian"
      },
      {
        "Code": "mg",
        "Language": "Malagasy"
      },
      {
        "Code": "ms",
        "Language": "Malay"
      },
      {
        "Code": "mt",
        "Language": "Maltese"
      },
      {
        "Code": "yua",
        "Language": "Yucatec Maya"
      },
      {
        "Code": "no",
        "Language": "Norwegian Bokmål"
      },
      {
        "Code": "otq",
        "Language": "Querétaro Otomi"
      },
      {
        "Code": "fa",
        "Language": "Persian"
      },
      {
        "Code": "pl",
        "Language": "Polish"
      },
      {
        "Code": "pt",
        "Language": "Portuguese"
      },
      {
        "Code": "ro",
        "Language": "Romanian"
      },
      {
        "Code": "ru",
        "Language": "Russian"
      },
      {
        "Code": "sm",
        "Language": "Samoan"
      },
      {
        "Code": "sr-Cyrl",
        "Language": "Serbian (Cyrillic)"
      },
      {
        "Code": "sr-Latn",
        "Language": "Serbian (Latin)"
      },
      {
        "Code": "sk",
        "Language": "Slovak"
      },
      {
        "Code": "sl",
        "Language": "Slovenian"
      },
      {
        "Code": "es",
        "Language": "Spanish"
      },
      {
        "Code": "sv",
        "Language": "Swedish"
      },
      {
        "Code": "ty",
        "Language": "Tahitian"
      },
      {
        "Code": "ta",
        "Language": "Tamil"
      },
      {
        "Code": "th",
        "Language": "Thai"
      },
      {
        "Code": "to",
        "Language": "Tongan"
      },
      {
        "Code": "tr",
        "Language": "Turkish"
      },
      {
        "Code": "uk",
        "Language": "Ukrainian"
      },
      {
        "Code": "ur",
        "Language": "Urdu"
      },
      {
        "Code": "vi",
        "Language": "VietLanguagese"
      },
      {
        "Code": "cy",
        "Language": "Welsh"
      }
    ]
  }

  getGender(type) {
    if (type == 'M') {
      return 'ذكر'
    } else {
      return 'انثي'
    }
  }


  setLang() {
    localStorage.setItem('userLang', this.lang)
  }

  checkLang() {
    if (localStorage.getItem('userLang')) {
      this.lang = localStorage.getItem('userLang')
    }
  }
}
