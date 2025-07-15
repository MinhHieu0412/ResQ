//package com.livewithoutthinking.resq.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//import java.nio.charset.StandardCharsets;
//import java.util.Base64;
//import java.util.Map;
//
//@Service
//public class PayPalService {
//
//    @Value("${paypal.client-id}")
//    private String clientId;
//
//    @Value("${paypal.client-secret}")
//    private String clientSecret;
//
//    @Value("${paypal.api}")
//    private String apiBase;
//
//    @Value("${paypal.return-url}")
//    private String returnUrl;
//
//    @Value("${paypal.cancel-url}")
//    private String cancelUrl;
//
//    @Autowired
//    private RestTemplate restTemplate;
//
//    public String getAccessToken() {
//        String credentials = Base64.getEncoder()
//                .encodeToString((clientId + ":" + clientSecret).getBytes(StandardCharsets.UTF_8));
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        headers.set("Authorization", "Basic " + credentials);
//
//        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//        body.add("grant_type", "client_credentials");
//
//        HttpEntity<?> request = new HttpEntity<>(body, headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(
//                apiBase + "/v1/oauth2/token", request, Map.class);
//
//        return response.getBody().get("access_token").toString();
//    }
//
//    public Map<String, Object> createOrder() {
//        String token = getAccessToken();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth(token);
//
//        String body = """
//        {
//          "intent": "CAPTURE",
//          "purchase_units": [
//            {
//              "amount": {
//                "currency_code": "USD",
//                "value": "20.00"
//              }
//            }
//          ],
//          "application_context": {
//            "return_url": "%s",
//            "cancel_url": "%s"
//          }
//        }
//        """.formatted(returnUrl, cancelUrl);
//
//        HttpEntity<String> entity = new HttpEntity<>(body, headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(
//                apiBase + "/v2/checkout/orders", entity, Map.class);
//
//        return response.getBody();
//    }
//
//    public Map<String, Object> captureOrder(String orderId) {
//        String token = getAccessToken();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth(token);
//
//        HttpEntity<String> entity = new HttpEntity<>("", headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(
//                apiBase + "/v2/checkout/orders/" + orderId + "/capture", entity, Map.class);
//
//        return response.getBody();
//    }
//}
