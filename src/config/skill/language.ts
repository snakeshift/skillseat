// import { ExperienceLevels } from '@/types/config/company/experienceLevel'

export enum LANGUAGE_ID {
  HTML5 = 1,
  CSS3,
  JavaScript,
  PHP,
  Java,
  Ruby,
  Python,
  C,
  'C＃',
  'C++',
  R,
  TypeScript,
  Swift,
  Kotlin,
  Go,
  '.NET',
  Dart,
  Perl,
  Rust,
  Scala,
  Haskell,
  Julia,
  'F＃'
}

export const LANGUAGES = {
  [LANGUAGE_ID.HTML5]: {
    id: LANGUAGE_ID.HTML5,
    languageName: LANGUAGE_ID[LANGUAGE_ID.HTML5],
    logo: require('@/assets/imgs/logo/skill/language/html5.svg')
  },
  [LANGUAGE_ID.CSS3]: {
    id: LANGUAGE_ID.CSS3,
    languageName: LANGUAGE_ID[LANGUAGE_ID.CSS3],
    logo: require('@/assets/imgs/logo/skill/language/css3.svg')
  },
  [LANGUAGE_ID.JavaScript]: {
    id: LANGUAGE_ID.JavaScript,
    languageName: LANGUAGE_ID[LANGUAGE_ID.JavaScript],
    logo: require('@/assets/imgs/logo/skill/language/javascript.svg')
  },
  [LANGUAGE_ID.PHP]: {
    id: LANGUAGE_ID.PHP,
    languageName: LANGUAGE_ID[LANGUAGE_ID.PHP],
    logo: require('@/assets/imgs/logo/skill/language/php.svg')
  },
  [LANGUAGE_ID.Java]: {
    id: LANGUAGE_ID.Java,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Java],
    logo: require('@/assets/imgs/logo/skill/language/java.svg')
  },
  [LANGUAGE_ID.Ruby]: {
    id: LANGUAGE_ID.Ruby,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Ruby],
    logo: require('@/assets/imgs/logo/skill/language/ruby.svg')
  },
  [LANGUAGE_ID.Python]: {
    id: LANGUAGE_ID.Python,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Python],
    logo: require('@/assets/imgs/logo/skill/language/python.svg')
  },
  [LANGUAGE_ID.C]: {
    id: LANGUAGE_ID.C,
    languageName: LANGUAGE_ID[LANGUAGE_ID.C],
    logo: require('@/assets/imgs/logo/skill/language/c.svg')
  },
  [LANGUAGE_ID['C＃']]: {
    id: LANGUAGE_ID['C＃'],
    languageName: LANGUAGE_ID[LANGUAGE_ID['C＃']],
    logo: require('@/assets/imgs/logo/skill/language/c-sharp.svg')
  },
  [LANGUAGE_ID['C++']]: {
    id: LANGUAGE_ID['C++'],
    languageName: LANGUAGE_ID[LANGUAGE_ID['C++']],
    logo: require('@/assets/imgs/logo/skill/language/c-plusplus.svg')
  },
  [LANGUAGE_ID.R]: {
    id: LANGUAGE_ID.R,
    languageName: LANGUAGE_ID[LANGUAGE_ID.R],
    logo: require('@/assets/imgs/logo/skill/language/r.svg')
  },
  [LANGUAGE_ID.TypeScript]: {
    id: LANGUAGE_ID.TypeScript,
    languageName: LANGUAGE_ID[LANGUAGE_ID.TypeScript],
    logo: require('@/assets/imgs/logo/skill/language/typescript.svg')
  },
  [LANGUAGE_ID.Swift]: {
    id: LANGUAGE_ID.Swift,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Swift],
    logo: require('@/assets/imgs/logo/skill/language/swift.svg')
  },
  [LANGUAGE_ID.Kotlin]: {
    id: LANGUAGE_ID.Kotlin,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Kotlin],
    logo: require('@/assets/imgs/logo/skill/language/kotlin.svg')
  },
  [LANGUAGE_ID.Go]: {
    id: LANGUAGE_ID.Go,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Go],
    logo: require('@/assets/imgs/logo/skill/language/go.svg')
  },
  [LANGUAGE_ID['.NET']]: {
    id: LANGUAGE_ID['.NET'],
    languageName: LANGUAGE_ID[LANGUAGE_ID['.NET']],
    logo: require('@/assets/imgs/logo/skill/language/dotnet.svg')
  },
  [LANGUAGE_ID.Dart]: {
    id: LANGUAGE_ID.Dart,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Dart],
    logo: require('@/assets/imgs/logo/skill/language/dart.svg')
  },
  [LANGUAGE_ID.Perl]: {
    id: LANGUAGE_ID.Perl,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Perl],
    logo: require('@/assets/imgs/logo/skill/language/perl.svg')
  },
  [LANGUAGE_ID.Rust]: {
    id: LANGUAGE_ID.Rust,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Rust],
    logo: require('@/assets/imgs/logo/skill/language/rust.svg')
  },
  [LANGUAGE_ID.Scala]: {
    id: LANGUAGE_ID.Scala,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Scala],
    logo: require('@/assets/imgs/logo/skill/language/scala.svg')
  },
  [LANGUAGE_ID.Haskell]: {
    id: LANGUAGE_ID.Haskell,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Haskell],
    logo: require('@/assets/imgs/logo/skill/language/haskell.svg')
  },
  [LANGUAGE_ID.Julia]: {
    id: LANGUAGE_ID.Julia,
    languageName: LANGUAGE_ID[LANGUAGE_ID.Julia],
    logo: require('@/assets/imgs/logo/skill/language/julia.svg')
  },
  [LANGUAGE_ID['F＃']]: {
    id: LANGUAGE_ID['F＃'],
    languageName: LANGUAGE_ID[LANGUAGE_ID['F＃']],
    logo: require('@/assets/imgs/logo/skill/language/f-sharp.svg')
  }
}
