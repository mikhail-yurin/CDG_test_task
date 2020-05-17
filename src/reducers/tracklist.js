import { GET_TRACKLIST_SUCCESS, GET_TRACKLIST_FAILURE } from '../actions/tracklist';

const defaultState = [];

// this is fake response we need it because GitHub Pages return only static content
const staticTracklist = [
  {
    path: 'ALIEN-REd-WOLf_We-Filled-Nora-160.mp3',
    artist: 'ALIEN REd WOLf',
    title: 'We Filled Nora',
    duration: '145',
  },
  {
    path: 'Akcija_Megaminute-160.mp3',
    artist: 'Akcija',
    title: 'Megaminute',
    duration: '300',
  },
  {
    path: 'Peppy--The-Firing-Squad_YMXB-160.mp3',
    artist: 'Peppy & The Firing Squad',
    title: 'Y=MX+B',
    duration: '202',
  },
  {
    path: 'earthling_Light-Years-Away-160.mp3',
    artist: 'earthling',
    title: 'Light Years Away',
    duration: '317',
  },
  {
    path: 'subcycle_111---undergroundinvaders-160.mp3',
    artist: 'subcycle',
    title: '111 - underground_invaders',
    duration: '149',
  },
  {
    path: 'superSYMMETRY_JOURNEYthroughTIME2-160.mp3',
    artist: 'superSYMMETRY',
    title: 'JOURNEY_through_TIME',
    duration: '430',
  },
  {
    path: 'tylersrevenge_a-dark-and-stormy-nigh-160.mp3',
    artist: 'tylersrevenge',
    title: 'a dark and stormy night',
    duration: '153',
  },
  {
    path: 'vibesbuilderyahoode_Sparse---Youre-t-160.mp3',
    artist: 'vibesbuilder@yahoo.de',
    title: "Sparse - You're too late (Vibesbuilder RMX)",
    duration: '261',
  },
];

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_TRACKLIST_SUCCESS:
      return [...state, ...action.data.tracks];
    case GET_TRACKLIST_FAILURE:
      return [...state, ...staticTracklist];

    default:
      return state;
  }
};
