import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Map } from 'immutable';
import { routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { answersReducer, questionsReducer, reviewsReducer } from 'reducers';
import { IAnswer, IReview } from 'dto';
import { IQuestion } from '../dto';
import { QuestionType } from '../model';

export interface IStoreState {
  answers: Map<string, IAnswer[]>;
  questions: Map<string, IQuestion[]>;
  reviews: Map<string, IReview>;
  router: RouterState;
}

// tslint:disable:quotemark
const mockQuestions: IQuestion[] = [
  {
    "id": "qi1",
    "title": "Czy artykuł jest satyrą?",
    "description": "",
    "extraDescription": "Satyra bazuje na ironii. Może częściowo być prawdą, ale używane w niej wyolbrzymienia mają za zadanie wywołać efekt komiczny. To trochę jak dowcip. Dowcipy nie są prawdziwymi historiami, ale nie są też kłamstwami. ",
    "extraDescriptionText": "Jak sprawdzić czy to satyra?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Binary,
    "reviewId": "maLGWznu",
    "skipDesc": "Satyra, chociaż bywa nieprawdą, nie jest też kłamstwem. Nie możemy jej oceniać tak, jak ocenilibyśmy inne nieprawdziwe informacje. W tym miejscu nasza lista kontrolna dla tego artykułu się kończy.",
    "skipNo": 0,
    "points": 0,
    "pointsMultiplier": 0
  },
  {
    "id": "qi2",
    "title": "Czy masz emocjonalny stosunek do zagadnień opisanych w artykule?",
    "description": "",
    "extraDescription": "Emocje nie pomagają nam w obiektywnej ocenie. Weź to pod uwagę, kiedy otrzymasz wynik swojej analizy.",
    "extraDescriptionText": "Jak emocjonalny stosunek wpływa na ocenę treści?",
    "extraDescriptionAlways": true,
    "type": QuestionType.Binary,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 0,
    "pointsMultiplier": 0
  },
  {
    "id": "qi3",
    "title": "Czy nagłówek jest sensacyjny?",
    "description": "",
    "extraDescriptionText": "Jak ocenić czy nagłówek jest sensacyjny?",
    "extraDescription": "Zastanów się, czy w nagłówku jest dużo przymiotników, wykrzykników i słów nacechowanych emocjonalnie: “sromotna klęska”, “hańba”, “sukces”, “tragedia”. Czy nagłówek zawiera takie zwroty jak “nie do wiary”, albo “szok”? Jeśli tak, to jest duża szansa, że nie jest to wartościowy i rzetelny artykuł.",
    "extraDescriptionAlways": false,
    "type": QuestionType.Range,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 0,
    "pointsMultiplier": 0
  },
  {
    "id": "qi4",
    "title": "Czy nagłówek zgadza się z resztą artykułu?",
    "description": "",
    "extraDescriptionText": "Jak ocenić zgodność nagłówka z resztą artykułu?",
    "extraDescription": "Czy nagłówek jest utrzymany w podobnym tonie co reszta artykułu, czy jest napisany bardziej sensacyjnie tylko po to, żebyś z ciekawości w niego kliknął? Im więcej wejść ma strona, tym więcej wyświetleń mają zamieszczone na niej reklamy, tym więcej pieniędzy trafia do właścicieli strony. Dlatego właśnie niektóre zupełnie niewinne artykuły kuszą szokującymi tytułami - jeśli klikniesz, zapewnisz zysk właścicielom.",
    "extraDescriptionAlways": false,
    "type": QuestionType.Binary,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 8,
    "pointsMultiplier": 0.8
  },
  {
    "id": "qi5",
    "title": "Czy język artykułu jest sensacyjny?",
    "description": "",
    "extraDescription": "Zastanów się: czy artykuł używa raczej spokojnego, precyzyjnego języka? A może operuje na przymiotnikach, słowach nacechowanych emocjonalnie, straszy, wysuwa niepoparte rzetelnymi źródłami kontrowersyjne tezy?",
    "extraDescriptionText": "Jak ocenić czy język artykułu jest sensacyjny?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Range,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 8,
    "pointsMultiplier": 0.8
  },
  {
    "id": "qi6",
    "title": "Czy w artykule występuje mowa nienawiści?",
    "description": "",
    "extraDescription": "Czy artykuł usprawiedliwia dyskryminację i przemoc w stosunku do jakiejś grupy społecznej? Pamiętaj, że uogólnienia krzywdzą, rzetelne artykuły raczej ich unikają.",
    "extraDescriptionText": "Jak rozpoznać mowę nienawiści?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Range,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 12,
    "pointsMultiplier": 1.2
  },
  {
    "id": "qi7",
    "title": "Czy podane są źródła (osoba, instytucja, badania na które powołuje się artykuł)?",
    "description": "",
    "extraDescription": "Żródła, czyli na przykład osoby, badania, instytucje, które ze względu na swoje doświadczenie w temacie mogą rzetelnie i wiarygodnie wypowiadać się na dany temat.",
    "extraDescriptionText": "Co to są źródła?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Binary,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 0,
    "pointsMultiplier": 0
  },
  {
    "id": "qi8",
    "title": "Czy podane w artykule źródła są wiarygodne?",
    "description": "",
    "extraDescription": "W artykule wypowiada się naukowiec? A może to wcale nie jest fachowiec? Poszukaj tej osoby w Internecie, sprawdź czy rzeczywiście jest naukowcem, czy publikuje w ważnych czasopismach naukowych, czy jest znana za granicą. A jeśli autor odwołuje się do jakiejś instytucji? Jej też możesz poszukać w Internecie. Niektóre instytucje wydają się być niezależne, a tymczasem są finansowane przez ludzi w których interesie leży, żeby przedstawiać światu ich wersję rzeczywistości. Inne instytucje mają w nazwie “Instytut” albo “Centrum badań”, a tak naprawdę nie są oficjalnie rozpoznawanymi jednostkami badawczymi.",
    "extraDescriptionText": "Jak ocenić wiarygodnośćc źródeł?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Range,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 15,
    "pointsMultiplier": 1.5
  },
  {
    "id": "qi9",
    "title": "Czy podano autora?",
    "description": "",
    "extraDescription": "Czasami dane autora są umieszczone pod tytułem artykułu, a czasem na końcu. Czasami takich danych w ogóle nie ma albo są jedynie inicjałami i to też jest w porządku. Duże, rzetelne redakcje nie zawsze podają dane autora, zwłaszcza przy krótkich, mniej ważnych artykułach. Jeśli jednak możesz sprawdzić kto jest autorem, możesz też sprawdzić czy ta osoba zna się na działce o której piszesz.",
    "extraDescriptionText": "Gdzie szukać autora?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Binary,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 0,
    "pointsMultiplier": 0
  },
  {
    "id": "qi10",
    "title": "Czy autor jest wiarygodny?",
    "description": "",
    "extraDescription": "Czy autor tego artykułu jest niezależny? Jeśli wyszukasz jego nazwisko w internecie to w jakim kontekście występuje? Czy zna się na dziedzinie o której pisze? Czy ma doświadczenie? Czy dostał jakieś nagrody dziennikarskie bądź branżowe?",
    "extraDescriptionText": "Jak ocenić wiarygodność autora?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Range,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 12,
    "pointsMultiplier": 1.2
  },
  {
    "id": "qi11",
    "title": "Czy artykuł jest zgodny z aktualną wiedzą?",
    "description": "",
    "extraDescription": "Jeśli w artykuł powołuje się na źródła, na przykład badania, które powstały 15 lat temu, jest szansa, że nasza wiedza poszła w tym czasie do przodu i informacje zawarte w artykule są nieaktualne, nawet jeśli sam artykuł został opublikowany niedawno!",
    "extraDescriptionText": "Jak ocenić zgodność z aktualną wiedzą?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Range,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 8,
    "pointsMultiplier": 0.8
  },
  {
    "id": "qi12",
    "title": "Czy artykuł zawiera istotne dla treści zdjęcia?",
    "description": "",
    "extraDescription": "Czy artykuł jest zilustrowany zdjęciami? Jeśli tak, to czy zdjęcia są ważne dla artykułu, na przykład pokazują sylwetkę sprawcy, albo miejsce wypadku, czy są jedynie ilustracją (na przykład zdjęciem owoców do artykułu o zdrowiu?).",
    "extraDescriptionText": "Jak rozróżnić istotne i nieistotne dla artykułu zdjęcia?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Range,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 8,
    "pointsMultiplier": 0.8
  },
  {
    "id": "qi13",
    "title": "Oceń wiarygodność zdjęć?",
    "description": "",
    "extraDescription": "Popatrz na zdjęcie. Czy są podane jego źródła, na przykład nazwisko fotografa, nazwa agencji prasowej albo przynajmniej pełny adres strony z której zostały pozyskane? Czy dużo na nich widać? Czy istnieje możliwość, że zostały zmanipulowane - odpowiednio przycięte albo przerobione w programie graficznym? Zwróć uwagę na szczegóły, czy zgadzają się z treścią artykułu? Możesz również dzięki funkcji “wyszukiwanie grafiką” odszukać na jakich innych stronach i w jakich kontekstach pojawia się to zdjęcie. (https://www.google.com/intl/pl/insidesearch/features/images/searchbyimage.html).",
    "extraDescriptionText": "Jak ocenić wiarygodność zdjęć?",
    "extraDescriptionAlways": false,
    "type": QuestionType.Range,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 15,
    "pointsMultiplier": 1.5
  },
  {
    "id": "qi14",
    "title": "Wklej linki do źródeł. Czy źródła potwierdzają prawdziwość artykułu?",
    "description": "",
    "extraDescription": "",
    "extraDescriptionAlways": false,
    "type": QuestionType.Text,
    "reviewId": "maLGWznu",
    "skipDesc": "",
    "skipNo": 0,
    "points": 0,
    "pointsMultiplier": 0
  }
];

const mockReviews = Map<string, IReview>([
  ['maLGWznu', {
    id: 'maLGWznu',
    url: 'http://wiadomosci.gazeta.pl/wiadomosci/7,114883,23036572,duda-gratuluje-stochowi-medalu-piekny-prezent-na-100-lecie.html#Z_MT',
  }]
]);

const initialState = {
  answers: Map(),
  // reviews: Map(),
  reviews: mockReviews,
  // questions: Map(),
  questions: Map([
    ['maLGWznu', mockQuestions],
  ])
};

export const history = createBrowserHistory();

export const configureStore = () => createStore(
  connectRouter(history)(combineReducers({
    answers: answersReducer,
    questions: questionsReducer,
    reviews: reviewsReducer,
    routing: routerReducer,
  })),
  initialState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
);
