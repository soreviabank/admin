importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({apiKey:"AIzaSyA_iq7zGnD4100DM06D9sXgMjbCwfqq3JU",authDomain:"sorevia-bank.firebaseapp.com",projectId:"sorevia-bank",storageBucket:"sorevia-bank.firebasestorage.app",messagingSenderId:"729316261396",appId:"1:729316261396:web:bfeebed60e968c65433101"});
const messaging = firebase.messaging();

/* Notification reçue quand le site est fermé ou en arrière-plan */
messaging.onBackgroundMessage(payload => {
  const d = payload.data || {};
  return self.registration.showNotification(d.title || "Sorevia Bank", {
    body: d.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    tag: d.tag || undefined,
    data: { url: d.url || "./espace.html" }
  });
});

/* Clic sur la notification : ouvre ou ramène l'espace */
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = new URL((event.notification.data && event.notification.data.url) || "./", self.registration.scope).href;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list) { if (c.url.split("?")[0] === target.split("?")[0] && "focus" in c) return c.focus(); }
      return clients.openWindow(target);
    })
  );
});
