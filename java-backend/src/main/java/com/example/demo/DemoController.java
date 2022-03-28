package com.example.demo;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
public class DemoController {
    @GetMapping("/toggle")
    void toggleDnd() throws ExecutionException, InterruptedException {
        System.out.println("toggle dnd");
        Firestore db = FirestoreClient.getFirestore();
        // replace document id with your userid (copy from web)
        var docRef = db.collection("users").document("WgztCmi2PxgnM1IQ0uHVlCKWgbJ3");
        ApiFuture<DocumentSnapshot> query = docRef.get();
        var doc = query.get();
        System.out.println(doc.getData());
        var currentDnd = doc.getBoolean("dnd");
        docRef.update("dnd", !currentDnd);

    }
}
