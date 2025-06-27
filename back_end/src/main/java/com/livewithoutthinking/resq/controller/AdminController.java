package com.livewithoutthinking.resq.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.livewithoutthinking.resq.dto.*;
import com.livewithoutthinking.resq.entity.*;
import com.livewithoutthinking.resq.service.*;
import com.livewithoutthinking.resq.service.PartnerService;
import com.livewithoutthinking.resq.service.serviceImpl.UserServiceImpl;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/resq/admin")
public class AdminController {
    @Autowired
    private UserServiceImpl userSrv;
    @Autowired
    private PartnerService partSrv;
    @Autowired
    private FeedbackService feedbackSrv;
    @Autowired
    private ExtraServiceSrv extraServiceSrv;
    @Autowired
    private RequestResQService reqResQSrv;
    @Autowired
    private StaffService staffSrv;
    @Autowired
    private ManagerService managerSrv;
    @Autowired
    private CustomerService customerSrv;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SrvService serviceSrv;
    @Autowired
    private PaymentService paymentSrv;
    @Autowired
    private RequestSrvService requestServiceSrv;
    @Autowired
    private DocumentaryService documentSrv;
    @Autowired
    private PersonalDataService personalDataSrv;

    //==================FEEDBACK SECTION==================
    @GetMapping("/feedbacks")
    public ResponseEntity<List<FeedbackDto>> getFeedbacks() {
        return ok(feedbackSrv.findAll());    }

    @GetMapping("/feedbacks/searchFeedbackByRR/{rrId}")
    public ResponseEntity<FeedbackDto> searchFeedbackByRR(@PathVariable("rrId") int rrId) {
        return ok(feedbackSrv.searchByRRid(rrId));
    }

    @GetMapping("/feedbacks/searchFeedbackByPartner/{partnerId}")
    public ResponseEntity<List<FeedbackDto>> searchFeedbackByPartner(@PathVariable("partnerId") int partnerId) {
        return ok(feedbackSrv.searchByPartner(partnerId));
    }

    @GetMapping("/feedbacks/averageRate/{partnerId}")
    public ResponseEntity<Double> averageRate(@PathVariable("partnerId") int partnerId) {
        return ok(feedbackSrv.averageRate(partnerId));
    }

    //==================USER SECTION==================
    //--CUSTOMER--//
    @GetMapping("/customers")
    public ResponseEntity<List<UserDto>> getCustomers() {
        return ok(customerSrv.findAllCustomers());
    }

    @GetMapping("/customer/searchCustomerById/{customerId}")
    public ResponseEntity<UserDto> searchCustomerById(@PathVariable("customerId") int customerId) {
        return ok(customerSrv.searchCustomerById(customerId));
    }

    @GetMapping("/customers/searchCustomers/{keyword}")
    public ResponseEntity<List<UserDto>> searchCustomers(@PathVariable("keyword") String keyword) {
        return ok(customerSrv.searchCustomers(keyword));
    }

    @GetMapping("/customers/customerDashboard/{userId}")
    public ResponseEntity<UserDashboard> customerDashboard(@PathVariable("userId") int userId) {
            return ok(customerSrv.customerDashboard(userId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/customers/createCustomer")
    public ResponseEntity<?> createCustomer(
            @RequestPart String userDtoString,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            UserDto userDto = mapper.readValue(userDtoString, UserDto.class);
            Map<String, String> errors = validateUserDto(userDto);
            String existedMessage = userExists(userDto);
            if(existedMessage != null){
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(ApiResponse.conflictData(null, existedMessage));
            }
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            return ResponseEntity.ok(customerSrv.createNew(userDto, avatar));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating staff: " + e.getMessage());
        }
    }
    //--STAFF--//
    @GetMapping("/staffs")
    public ResponseEntity<List<StaffDto>> getStaffs() {
        return ok(staffSrv.findAllStaffs());
    }

    @GetMapping("/staffs/searchStaffs/{keyword}")
    public ResponseEntity<List<StaffDto>> searchStaffs(@PathVariable("keyword") String keyword) {
        return ok(staffSrv.searchStaffs(keyword));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/staffs/createStaff")
    public ResponseEntity<?> createStaff(
            @RequestPart String userDtoString,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            UserDto userDto = mapper.readValue(userDtoString, UserDto.class);
            Map<String, String> errors = validateUserDto(userDto);
            System.out.println(userDto);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            System.out.println("Validated");
            String existedMessage = userExists(userDto);
            if(existedMessage != null && !existedMessage.isEmpty()){
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(ApiResponse.conflictData(null, existedMessage));
            }
            Staff newStaff = staffSrv.createNew(userDto, avatar);
            return ResponseEntity.ok(newStaff);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating staff: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/staffs/{staffId}")
    public ResponseEntity<?> updateStaff(
            @PathVariable int staffId,
            @RequestPart String userDtoString,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            UserDto userDto = mapper.readValue(userDtoString, UserDto.class);
            if (userDto.getUserid() == 0) {
                userDto.setUserid(staffId);
            }
            Optional<User> oldUserOpt = userRepository.findById(staffId);
            if (oldUserOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Cannot fidn user with ID: " + staffId);
            }
            if (userDto.getPassword() == null || userDto.getPassword().trim().isEmpty()) {
                userDto.setPassword(oldUserOpt.get().getPassword());
            }
            System.out.println(oldUserOpt.get().getPassword());
            System.out.println(userDto.getPassword());
            Map<String, String> errors = validateUserDto(userDto);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            UserDto updated = userSrv.updateStaff(userDto, avatar);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Error updating staff: " + e.getMessage());
        }
    }

    //--MANGAGER-//
    @GetMapping("/managers")
    public ResponseEntity<List<StaffDto>> getManagers() {
        return ok(managerSrv.findAllManagers());
    }

    @GetMapping("/managers/searchManagers/{keyword}")
    public ResponseEntity<List<StaffDto>> searchManagers(@PathVariable("keyword") String keyword) {
        return ok(managerSrv.searchManagers(keyword));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/managers/createManager")
    public ResponseEntity<?> createNewManager(
            @RequestPart String userDtoString,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            UserDto userDto = mapper.readValue(userDtoString, UserDto.class);
            Map<String, String> errors = validateUserDto(userDto);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            String existedMessage = userExists(userDto);
            if(existedMessage != null && !existedMessage.isEmpty()){
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(ApiResponse.conflictData(null, existedMessage));
            }

            Staff newManager = managerSrv.createNew(userDto, avatar);
            return ResponseEntity.ok(newManager);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating manager: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/managers/{managerId}")
    public ResponseEntity<?> updateManager(
            @PathVariable int managerId,
            @RequestPart String userDtoString,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            UserDto userDto = mapper.readValue(userDtoString, UserDto.class);
            if (userDto.getUserid() == 0) {
                userDto.setUserid(managerId);
            }
            Optional<User> oldUserOpt = userRepository.findById(managerId);
            if (oldUserOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Cannot fidn user with ID: " + managerId);
            }
            if (userDto.getPassword() == null || userDto.getPassword().trim().isEmpty()) {
                userDto.setPassword(oldUserOpt.get().getPassword());
            }
            Map<String, String> errors = validateUserDto(userDto);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            UserDto updated = userSrv.updateStaff(userDto, avatar);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Error updating manager: " + e.getMessage());
        }
    }

    //==================PARTNER SECTION==================
    @GetMapping("/partners")
    public ResponseEntity<List<PartnerDto>> getPartners() {
        return ResponseEntity.status(200).body(partSrv.findAll());
    }

    @GetMapping("/partners/searchPartners/{keyword}")
    public ResponseEntity<List<PartnerDto>> searchPartners(@PathVariable("keyword") String keyword) {
        return ok(partSrv.searchPartners(keyword));
    }

    @GetMapping("/partners/findPartnerById/{partnerId}")
    public ResponseEntity<Optional<PartnerDto>> findPartnerById(@PathVariable("partnerId") int partnerId) {
        return ok(partSrv.findPartnerById(partnerId));
    }

    @GetMapping("/partners/partnerDashboard/{partnerId}")
    public ResponseEntity<UserDashboard> partnerDashboard(@PathVariable("partnerId") int partnerId) {
        return ok(partSrv.partnerDashboard(partnerId));
    }

    @GetMapping("/partners/approvePartner/{partnerId}")
    public ResponseEntity<Boolean> approvePartner(@PathVariable("partnerId") int partnerId) {
        return ok(partSrv.approvePartner(partnerId));
    }

    //==================SERVICE SECTION==================
    @GetMapping("/services/searchBySrvType/{keyword}")
    public ResponseEntity<List<ServiceDto>> searchBySrvType(@PathVariable("keyword") String keyword) {
        return ok(serviceSrv.findByServiceType(keyword));
    }

    //==================EXTRA SERVICE SECTION==================
    @GetMapping("/extraSrv/searchByReqResQ/{rrId}")
    public ResponseEntity<ExtraService> getExtraSrvByReqResQ(@PathVariable("rrId") int rrId) {
        return ok(extraServiceSrv.findExtraSrvByReqResQ(rrId));
    }

    //==================REQUEST RESQUE SECTION==================
    @GetMapping("/reqResQs")
    public ResponseEntity<List<RequestResQDto>> getReqResQs() {
        return ok(reqResQSrv.findAll());
    }

    @GetMapping("/reqResQs/{rrId}")
    public ResponseEntity<Optional<RequestResQDto>> findById(@PathVariable("rrId") int rrId) {
        return ok(reqResQSrv.findById(rrId));
    }

    @GetMapping("/reqResQs/searchByUser/{userId}")
    public ResponseEntity<List<RequestResQDto>> searchRRByUser(@PathVariable("userId") int userId) {
        return ok(reqResQSrv.searchByUser(userId));
    }

    @GetMapping("/reqResQs/searchByPartner/{partId}")
    public ResponseEntity<List<RequestResQDto>> searchByPartner(@PathVariable("partId") int partId) {
        return ok(reqResQSrv.searchByPartner(partId));
    }

    @GetMapping("/reqResQs/searchRequestResQ/{keyword}")
    public ResponseEntity<List<RequestResQDto>> searchRequestResQ(@PathVariable("keyword") String keyword) {
        return ok(reqResQSrv.searchRR(keyword));
    }

    @GetMapping("/reqResQs/searchWithUser/{userId}/{keyword}")
    public ResponseEntity<List<RequestResQDto>> searchRequestResQWithUser(@PathVariable("userId") int userId, @PathVariable("keyword") String keyword) {
        return ok(reqResQSrv.searchRRWithUser(userId, keyword));
    }

    @GetMapping("/reqResQs/searchWithPartner/{partId}/{keyword}")
    public ResponseEntity<List<RequestResQDto>> searchRequestResQWithPartner(@PathVariable("partId") int partId, @PathVariable("keyword") String keyword) {
        return ok(reqResQSrv.searchRRWithPartner(partId, keyword));
    }

    @GetMapping("/reqResQs/existedRecords/{rrId}")
    private ResponseEntity<RecordStatusDto> checkIsExistedRecords(@PathVariable("rrId") int rrId) {
        return ok(reqResQSrv.existedRecords(rrId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/reqResQs/createRequest")
    public ResponseEntity<?> createRequest(
            @RequestPart String requestDtoString,
            @RequestPart(required = false) String selectedServices) {
        try{
            System.out.println(selectedServices);
            ObjectMapper mapper = new ObjectMapper();
            RequestResQDto dto = mapper.readValue(requestDtoString, RequestResQDto.class);
            Map<String, String> errors = validateRequestDto(dto);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            RequestRescue requestRescue = reqResQSrv.createNew(dto);
            List<Integer> serviceIds = new ArrayList<>();
            if (selectedServices != null && !selectedServices.isEmpty()) {
                serviceIds = mapper.readValue(selectedServices, new TypeReference<List<Integer>>() {});
            }
            requestServiceSrv.createRequestServices(serviceIds,requestRescue);
            return ResponseEntity.ok(requestRescue);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating request: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/reqResQs/{requestId}")
    public ResponseEntity<?> updateManager(
            @PathVariable int requestId,
            @RequestPart String requestDtoString) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            RequestResQDto resQDto = mapper.readValue(requestDtoString, RequestResQDto.class);
            if (resQDto.getRrid() == 0) {
                resQDto.setRrid(requestId);
            }
            Map<String, String> errors = validateRequestDto(resQDto);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            RequestRescue updated = reqResQSrv.updateRequest(resQDto);
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Error updating request: " + e.getMessage());
        }
    }

    //Payment
    @GetMapping("/payments/getCustomerPayments/{customerId}")
    public ResponseEntity<List<PaymentDto>> getCustomerPayments(@PathVariable("customerId") int customerId) {
        return ok(paymentSrv.customerPayments(customerId));
    }

    //RequestServices
    @GetMapping("/requestServices/getByResquest/{rrid}")
    public ResponseEntity<List<RequestService>> getReqSrvByResquest(@PathVariable("rrid") int rrid) {
        return ok(requestServiceSrv.getReqSrvByResquest(rrid));
    }

    //Document
    @GetMapping("/documents/getUnverifiedPartnerDoc/{partnerId}")
    public ResponseEntity<List<Documentary>> getUnverifiedPartnerDoc(@PathVariable("partnerId") int partnerId) {
        return ok(documentSrv.getUnverifiedPartnerDoc(partnerId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/documents/updatePartnerDoc/{partnerId}")
    public ResponseEntity<?> updatePartnerDoc(@PathVariable("partnerId") int partnerId,
           @RequestBody VerifiedUserDto rejectData) {
        try {
            Map<String, String> errors = new HashMap<>();
            System.out.println("Reason:"+rejectData.getReason());
            if(rejectData.getReason() == null || rejectData.getReason().trim().isEmpty()) {
                errors.put("reason","Reason is required!");
            }
            if(rejectData.getDocumentTypes().size() <= 0) {
                errors.put("selectedDocuments","Please select at least one invalid document!");
            }
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            documentSrv.rejectPartner(rejectData.getDocumentTypes(), partnerId, rejectData.getReason());
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Err"+e.getMessage());
        }
    }

    //Personal Data
    @GetMapping("/personalDatas/getUnverifiedUserData/{customerId}")
    public ResponseEntity<PersonalData> getUnverifiedUserData(@PathVariable("customerId") int customerId) {
        return ok(personalDataSrv.getUnverifiedUserData(customerId));
    }

    @PutMapping("/personalDatas/approvedCustomer/{customerId}")
    public ResponseEntity<?> approveCustomer(@PathVariable("customerId") int customerId) {
        try{
            return ok(personalDataSrv.approvedCustomer(customerId));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Err"+e.getMessage());
        }
    }

    @PutMapping("/personalDatas/rejectedCustomer/{customerId}")
    public ResponseEntity<?> rejectCustomer(@PathVariable("customerId") int customerId,
                                            @RequestBody VerifiedUserDto rejectData) {
        try{
            Map<String, String> errors = new HashMap<>();
            if(rejectData.getReason() == null || rejectData.getReason().trim().isEmpty()) {
                errors.put("reason","Reason is required!");
            }
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            personalDataSrv.rejectedCustomer(customerId, rejectData.getReason());
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Err"+e.getMessage());
        }

    }

    //Support
    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok(body);
    }

    //Validation
    private Map<String, String> validateUserDto(UserDto dto) {
        Map<String, String> errors = new LinkedHashMap<>();

        // Full name
        if (dto.getFullName() == null || dto.getFullName().trim().isEmpty()) {
            errors.put("fullName", "Full name is required");
        } else if (dto.getFullName().trim().length() < 5){
            errors.put("fullName", "Full name must be at least 5 characters");
        } else if (!dto.getFullName().matches("^[A-Za-zÀ-ỹà-ỹ\\s]+$")) {
            errors.put("fullName", "Full name must not contain numbers or special characters");
        }

        // Username
        if (dto.getUserName() == null || dto.getUserName().trim().isEmpty()) {
            errors.put("userName", "Username is required");
        }else if(!dto.getUserName().matches("^[a-zA-Z0-9]+$")) {
            errors.put("userName", "Username must not contain whitespace or special characters");
        }

        //Address
        if(dto.getAddress() == null || dto.getAddress().trim().isEmpty()) {
            errors.put("address", "Address is required");
        }

        // Email
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            errors.put("email", "Email is required");
        } else if (!dto.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")) {
            errors.put("email", "Invalid email format");
        }

        // Phone number
        if (dto.getSdt() == null || dto.getSdt().trim().isEmpty()) {
            errors.put("sdt", "Phone number is required");
        } else if (!dto.getSdt().matches("^(0[0-9]{9})$")) {
            errors.put("sdt", "Phone number must start with 0 and contain 9 digits");
        }

        // Password
        if (dto.getPassword() == null || dto.getPassword().trim().isEmpty()) {
            errors.put("password", "Password is required");
        } else if (!dto.getPassword().matches("^.{8,}$")) {
            errors.put("password", "Password must have at least 8 characters");
        }

        return errors;
    }

    private String userExists(UserDto dto) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if(user.getSdt().equals(dto.getSdt())){
                return "User with this phone number already exists";
            }
            if(user.getUsername().equals(dto.getUserName())){
                return "User with this username already exists";
            }
            if(user.getEmail().equals(dto.getEmail())){
                return "User with this email already exists";
            }
            if(user.getAddress().equals(dto.getAddress())){
                return "User with this address already exists";
            }
        }
        return null;
    }

    private Map<String, String> validateRequestDto(RequestResQDto dto) {
        Map<String, String> errors = new LinkedHashMap<>();
        if(dto.getCustomerId() <= 0) {
            errors.put("customerId", "Customer is required");
        }
        if(dto.getULocation() == null || dto.getULocation().trim().isEmpty()) {
            errors.put("ulocation", "Customer's location is required");
        }
        if(dto.getRescueType() == null || dto.getRescueType().trim().isEmpty()) {
            errors.put("rescueType", "Service is required");
        }
        if(dto.getTotal() <= 0) {
            errors.put("specificSrv", "Specific service is required");
        }
        if(dto.getTotal() <= 0) {
            errors.put("specificSrv", "Specific service is required");
        }
        if(dto.getPaymentMethod() == null || dto.getPaymentMethod().trim().isEmpty()) {
            errors.put("paymentMethod", "Payment method is required");
        }
        if(dto.getDestination() == null || dto.getDestination().trim().isEmpty()) {
            errors.put("destination", "Destination is required");
        }
        return errors;
    }

}
