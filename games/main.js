var config = {
  apiKey: 'AIzaSyCszYWkqAN5VQsXjrtAVB7dI7hIB-q1CQ0',
  authDomain: 'mast-project-naam.firebaseapp.com',
  databaseURL: 'https://mast-project-naam.firebaseio.com',
  projectId: 'mast-project-naam',
  storageBucket: 'mast-project-naam.appspot.com',
  messagingSenderId: '400633154339'
}
const app = firebase.initializeApp(config)
const firestore = firebase.firestore()
firestore.settings({
  timestampsInSnapshots: true
})
const auth = firebase.auth()
auth.onAuthStateChanged(function(user) {
  if (!user) {
    window.location.href = '/'
  }
})
