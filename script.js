/* =========================================================
   OWNER AUTHENTICATION
========================================================= */

const OWNER_KEY =
    "warehouse_owner_account_v2";

const SESSION_KEY =
    "warehouse_owner_session_v2";

const DEFAULT_OWNER = {
    name:"Warehouse Owner",
    email:"owner@warehouse.com",
    password:"Warehouse@123"
};


function getOwner(){

    const saved =
        localStorage.getItem(
            OWNER_KEY
        );

    if(!saved){
        return DEFAULT_OWNER;
    }

    try{
        return JSON.parse(saved);
    }catch{
        return DEFAULT_OWNER;
    }

}


function saveOwner(owner){

    localStorage.setItem(
        OWNER_KEY,
        JSON.stringify(owner)
    );

}


function showAuthMessage(
    text,
    type="error"
){

    const box =
        document.getElementById(
            "authMessage"
        );

    box.textContent =
        text;

    box.className =
        "auth-message show " +
        type;

}


function hideAuthMessage(){

    document
        .getElementById(
            "authMessage"
        )
        .className =
        "auth-message";

}


/* LOGIN TAB */

document
    .getElementById(
        "loginTab"
    )
    .addEventListener(
        "click",
        function(){

            this.classList.add(
                "active"
            );

            document
                .getElementById(
                    "registerTab"
                )
                .classList
                .remove(
                    "active"
                );

            document
                .getElementById(
                    "loginForm"
                )
                .classList
                .add(
                    "active"
                );

            document
                .getElementById(
                    "registerForm"
                )
                .classList
                .remove(
                    "active"
                );

            hideAuthMessage();

        }
    );


/* REGISTER TAB */

document
    .getElementById(
        "registerTab"
    )
    .addEventListener(
        "click",
        function(){

            this.classList.add(
                "active"
            );

            document
                .getElementById(
                    "loginTab"
                )
                .classList
                .remove(
                    "active"
                );

            document
                .getElementById(
                    "registerForm"
                )
                .classList
                .add(
                    "active"
                );

            document
                .getElementById(
                    "loginForm"
                )
                .classList
                .remove(
                    "active"
                );

            hideAuthMessage();

        }
    );


/* PASSWORD EYE */

function setupPasswordToggle(
    inputId,
    buttonId
){

    document
        .getElementById(
            buttonId
        )
        .addEventListener(
            "click",
            function(){

                const input =
                    document
                        .getElementById(
                            inputId
                        );

                if(
                    input.type ===
                    "password"
                ){

                    input.type =
                        "text";

                    this.textContent =
                        "🙈";

                }else{

                    input.type =
                        "password";

                    this.textContent =
                        "👁";

                }

            }
        );

}


setupPasswordToggle(
    "loginPassword",
    "loginEye"
);

setupPasswordToggle(
    "registerPassword",
    "registerEye"
);


/* LOGIN */

document
    .getElementById(
        "loginForm"
    )
    .addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;

            const owner =
                getOwner();

            const valid =
                (
                    email ===
                    DEFAULT_OWNER.email &&
                    password ===
                    DEFAULT_OWNER.password
                ) ||
                (
                    email ===
                    String(owner.email)
                        .toLowerCase() &&
                    password ===
                    owner.password
                );

            if(!valid){

                showAuthMessage(
                    "Invalid owner email or password."
                );

                return;

            }

            const currentOwner =
                (
                    email ===
                    DEFAULT_OWNER.email &&
                    password ===
                    DEFAULT_OWNER.password
                )
                ?
                DEFAULT_OWNER
                :
                owner;

            const session = {

                loggedIn:true,
                name:currentOwner.name,
                email:currentOwner.email

            };

            if(
                document
                    .getElementById(
                        "rememberMe"
                    )
                    .checked
            ){

                localStorage.setItem(
                    SESSION_KEY,
                    JSON.stringify(session)
                );

            }else{

                sessionStorage.setItem(
                    SESSION_KEY,
                    JSON.stringify(session)
                );

            }

            showAuthMessage(
                "Login successful.",
                "success"
            );

            setTimeout(
                function(){

                    openPortal(
                        session
                    );

                },
                300
            );

        }
    );


/* REGISTER */

document
    .getElementById(
        "registerForm"
    )
    .addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            const name =
                document
                    .getElementById(
                        "ownerName"
                    )
                    .value
                    .trim();

            const email =
                document
                    .getElementById(
                        "registerEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById(
                        "registerPassword"
                    )
                    .value;

            const confirm =
                document
                    .getElementById(
                        "confirmPassword"
                    )
                    .value;

            if(name.length < 2){

                showAuthMessage(
                    "Please enter a valid owner name."
                );

                return;

            }

            if(
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)
            ){

                showAuthMessage(
                    "Please enter a valid email."
                );

                return;

            }

            if(password.length < 8){

                showAuthMessage(
                    "Password must contain at least 8 characters."
                );

                return;

            }

            if(password !== confirm){

                showAuthMessage(
                    "Passwords do not match."
                );

                return;

            }

            saveOwner({

                name:name,
                email:email,
                password:password

            });

            document
                .getElementById(
                    "loginEmail"
                )
                .value =
                email;

            document
                .getElementById(
                    "loginTab"
                )
                .click();

            showAuthMessage(
                "Owner account created successfully.",
                "success"
            );

        }
    );


/* FORGOT PASSWORD */

document
    .getElementById(
        "forgotPassword"
    )
    .addEventListener(
        "click",
        function(){

            const email =
                prompt(
                    "Enter your owner email:"
                );

            if(!email)return;

            const owner =
                getOwner();

            if(
                email
                    .trim()
                    .toLowerCase()
                !==
                String(owner.email)
                    .toLowerCase()
            ){

                alert(
                    "Owner account not found."
                );

                return;

            }

            const newPassword =
                prompt(
                    "Enter your new password:"
                );

            if(!newPassword)return;

            if(
                newPassword.length < 8
            ){

                alert(
                    "Password must contain at least 8 characters."
                );

                return;

            }

            owner.password =
                newPassword;

            saveOwner(owner);

            showAuthMessage(
                "Password changed successfully.",
                "success"
            );

        }
    );


function openPortal(
    user
){

    document
        .getElementById(
            "authScreen"
        )
        .classList
        .add(
            "hidden"
        );

    document
        .getElementById(
            "ownerPill"
        )
        .textContent =
        "Owner: " +
        user.name;

}


function restoreSession(){

    let saved =
        localStorage.getItem(
            SESSION_KEY
        );

    if(!saved){

        saved =
            sessionStorage.getItem(
                SESSION_KEY
            );

    }

    if(!saved)return;

    try{

        openPortal(
            JSON.parse(saved)
        );

    }catch{}

}


/* LOGOUT */

document
    .getElementById(
        "logoutBtn"
    )
    .addEventListener(
        "click",
        function(){

            localStorage.removeItem(
                SESSION_KEY
            );

            sessionStorage.removeItem(
                SESSION_KEY
            );

            location.reload();

        }
    );


/* =========================================================
   DATABASE
========================================================= */

const DB_KEY =
    "warehouse_portal_inventory_v2";

let db = {

    items:[],
    activity:[]

};


try{

    const saved =
        localStorage.getItem(
            DB_KEY
        );

    if(saved){

        const parsed =
            JSON.parse(
                saved
            );

        db = {

            items:
                Array.isArray(
                    parsed.items
                )
                ?
                parsed.items
                :
                [],

            activity:
                Array.isArray(
                    parsed.activity
                )
                ?
                parsed.activity
                :
                []

        };

    }

}catch{}


function saveDB(){

    localStorage.setItem(
        DB_KEY,
        JSON.stringify(db)
    );

}


function id(){

    return Date.now()
        .toString(36)
        +
        Math.random()
            .toString(36)
            .substring(2,8);

}


function currentDate(){

    const date =
        new Date();

    return new Date(
        date.getTime() -
        date.getTimezoneOffset()*60000
    )
    .toISOString()
    .slice(0,10);

}


function safe(value){

    return String(
        value ?? ""
    ).replace(
        /[&<>"']/g,
        function(char){

            return {
                "&":"&amp;",
                "<":"&lt;",
                ">":"&gt;",
                '"':"&quot;",
                "'":"&#39;"

            }[char];

        }
    );

}


function activity(
    action,
    detail
){

    db.activity.unshift({

        id:id(),

        action:action,

        detail:detail,

        time:
            new Date()
                .toISOString()

    });

    db.activity =
        db.activity
            .slice(
                0,
                150
            );

}


function toast(
    message
){

    const element =
        document
            .getElementById(
                "toast"
            );

    element.textContent =
        message;

    element.classList.add(
        "show"
    );

    clearTimeout(
        window.toastTimer
    );

    window.toastTimer =
        setTimeout(
            function(){

                element
                    .classList
                    .remove(
                        "show"
                    );

            },
            2200
        );

}


/* =========================================================
   NAVIGATION
========================================================= */

const navigationButtons =
    document.querySelectorAll(
        ".nav button"
    );


navigationButtons.forEach(
    button=>{

        button.addEventListener(
            "click",
            function(){

                openPage(
                    this.dataset.page
                );

                closeMobileSidebar();

            }
        );

    }
);


function openPage(
    page
){

    document
        .querySelectorAll(
            ".page"
        )
        .forEach(
            section=>{

                section.classList.toggle(
                    "active",
                    section.id === page
                );

            }
        );


    navigationButtons.forEach(
        button=>{

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        }
    );


    const titles={

        dashboard:"Dashboard",
        inventory:"Inventory",
        zones:"Warehouse Zones",
        alerts:"Alerts",
        suppliers:"Suppliers",
        activity:"Activity",
        settings:"Settings"

    };


    document
        .getElementById(
            "pageTitle"
        )
        .textContent =
        titles[page] ||
        "Dashboard";


    renderAll();

    window.scrollTo(
        0,
        0
    );

}


/* =========================================================
   SIDEBAR
========================================================= */

function closeMobileSidebar(){

    document
        .querySelector(
            ".sidebar"
        )
        .classList
        .remove(
            "mobile-open"
        );

    document
        .getElementById(
            "sidebarOverlay"
        )
        .classList
        .remove(
            "show"
        );

}


document
    .getElementById(
        "sidebarToggle"
    )
    .addEventListener(
        "click",
        function(){

            if(
                window.innerWidth <= 700
            ){

                const side =
                    document
                        .querySelector(
                            ".sidebar"
                        );

                const open =
                    !side.classList.contains(
                        "mobile-open"
                    );

                side.classList.toggle(
                    "mobile-open",
                    open
                );

                document
                    .getElementById(
                        "sidebarOverlay"
                    )
                    .classList.toggle(
                        "show",
                        open
                    );

            }else{

                document.body
                    .classList
                    .toggle(
                        "sidebar-collapsed"
                    );

            }

        }
    );


document
    .getElementById(
        "sidebarOverlay"
    )
    .addEventListener(
        "click",
        closeMobileSidebar
    );


document
    .getElementById(
        "quickAdd"
    )
    .addEventListener(
        "click",
        function(){

            openPage(
                "inventory"
            );

        }
    );


/* =========================================================
   INVENTORY
========================================================= */

function stockStatus(
    item
){

    const quantity =
        Number(
            item.quantity || 0
        );

    const reorder =
        Number(
            item.reorder || 0
        );

    if(quantity <= 0){

        return[
            "out",
            "Out of Stock"
        ];

    }

    if(quantity <= reorder){

        return[
            "low",
            "Low Stock"
        ];

    }

    return[
        "ok",
        "Healthy"
    ];

}


function renderInventory(){

    const search =
        document
            .getElementById(
                "inventorySearch"
            )
            .value
            .trim()
            .toLowerCase();


    const items =
        db.items.filter(
            item=>{

                const text =
                    [
                        item.name,
                        item.sku,
                        item.barcode,
                        item.category,
                        item.zone,
                        item.bin,
                        item.supplier
                    ]
                    .join(" ")
                    .toLowerCase();

                return text.includes(
                    search
                );

            }
        );


    document
        .getElementById(
            "inventoryTable"
        )
        .innerHTML =
        items.length
        ?
        items.map(
            item=>{

                const state =
                    stockStatus(
                        item
                    );

                const displayState = item.needsDetails
                    ? ["low", "Needs Details"]
                    : state;

                return `

                <tr>

                    <td>

                        ${
                            item.photo
                            ?
                            `
                            <img
                                src="${item.photo}"
                                class="thumb"
                                alt="Item">
                            `
                            :
                            `
                            <div
                                class="no-photo">
                                📦
                            </div>
                            `
                        }

                    </td>


                    <td>
                        <b>
                            ${safe(item.sku)}
                        </b>
                    </td>


                    <td>
                        ${safe(item.barcode || "—")}
                    </td>


                    <td>
                        ${safe(item.name)}
                    </td>


                    <td>
                        ${safe(item.category)}
                    </td>


                    <td>
                        ${item.quantity}
                        ${safe(item.unit)}
                    </td>


                    <td>
                        ${safe(item.zone)}
                        /
                        ${safe(item.bin)}
                    </td>


                    <td>

                        <span
                            class="badge ${displayState[0]}">

                            ${displayState[1]}

                        </span>

                    </td>


                    <td>

                        <button
                            class="secondary inventory-action"
                            onclick="editInventory('${item.id}')">

                            ${item.needsDetails ? "Complete Details" : "Edit"}

                        </button>


                        <button
                            class="danger inventory-action"
                            onclick="deleteInventory('${item.id}')">

                            Delete

                        </button>

                    </td>

                </tr>

                `;

            }
        ).join("")
        :
        `
        <tr>

            <td
                colspan="9"
                class="empty">

                No inventory records found.

            </td>

        </tr>
        `;

}


function editInventory(
    itemId
){

    const item =
        db.items.find(
            x=>x.id===itemId
        );

    if(!item)return;

    openPage(
        "inventory"
    );


    document
        .getElementById(
            "inventoryTitle"
        )
        .textContent =
        item.needsDetails
            ? "Complete Scanned Item Details"
            : "Edit Inventory Item";


    document
        .getElementById(
            "itemId"
        )
        .value =
        item.id;


    document
        .getElementById(
            "itemName"
        )
        .value =
        item.name;


    document
        .getElementById(
            "skuCode"
        )
        .value =
        item.sku;

    document
        .getElementById("barcodeCode")
        .value = item.barcode || "";


    document
        .getElementById(
            "category"
        )
        .value =
        item.category;


    document
        .getElementById(
            "unit"
        )
        .value =
        item.unit;


    document
        .getElementById(
            "quantity"
        )
        .value =
        item.quantity;


    document
        .getElementById(
            "reorderLevel"
        )
        .value =
        item.reorder;


    document
        .getElementById(
            "zone"
        )
        .value =
        item.zone;


    document
        .getElementById(
            "bin"
        )
        .value =
        item.bin;


    document
        .getElementById(
            "supplier"
        )
        .value =
        item.supplier;


    document
        .getElementById(
            "purchaseDate"
        )
        .value =
        item.purchaseDate;


    document
        .getElementById(
            "expiryDate"
        )
        .value =
        item.expiryDate || "";


    document
        .getElementById(
            "photoPreview"
        )
        .innerHTML =
        item.photo
        ?
        `<img src="${item.photo}" alt="Preview">`
        :
        "No photo selected";

}


function deleteInventory(
    itemId
){

    const item =
        db.items.find(
            x=>x.id===itemId
        );

    if(!item)return;

    if(
        !confirm(
            "Delete "+
            item.name+
            " from inventory?"
        )
    )
        return;

    db.items =
        db.items.filter(
            x=>x.id!==itemId
        );

    activity(
        "Inventory deleted",
        item.sku+
        " — "+
        item.name
    );

    saveDB();
    renderAll();

    toast(
        "Inventory item deleted."
    );

}


/* SAVE INVENTORY */

document
    .getElementById(
        "inventoryForm"
    )
    .addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const image =
                document
                    .getElementById(
                        "photoPreview"
                    )
                    .querySelector(
                        "img"
                    );


            const item={

                id:
                    document
                        .getElementById(
                            "itemId"
                        )
                        .value ||
                    id(),

                name:
                    document
                        .getElementById(
                            "itemName"
                        )
                        .value
                        .trim(),

                sku:
                    document
                        .getElementById(
                            "skuCode"
                        )
                        .value
                        .trim()
                    ||
                    (
                        "SKU-"+
                        Date.now()
                            .toString()
                            .slice(-6)
                    ),

                barcode:
                    document
                        .getElementById("barcodeCode")
                        .value
                        .trim(),

                photo:
                    image
                    ?
                    image.src
                    :
                    "",

                category:
                    document
                        .getElementById(
                            "category"
                        )
                        .value,

                unit:
                    document
                        .getElementById(
                            "unit"
                        )
                        .value,

                quantity:
                    Number(
                        document
                            .getElementById(
                                "quantity"
                            )
                            .value ||
                        0
                    ),

                reorder:
                    Number(
                        document
                            .getElementById(
                                "reorderLevel"
                            )
                            .value ||
                        0
                    ),

                zone:
                    document
                        .getElementById(
                            "zone"
                        )
                        .value,

                bin:
                    document
                        .getElementById(
                            "bin"
                        )
                        .value
                        .trim(),

                supplier:
                    document
                        .getElementById(
                            "supplier"
                        )
                        .value,

                purchaseDate:
                    document
                        .getElementById(
                            "purchaseDate"
                        )
                        .value ||
                    currentDate(),

                expiryDate:
                    document
                        .getElementById(
                            "expiryDate"
                        )
                        .value,

                needsDetails:false

            };


            if(!item.name){

                toast(
                    "Please enter an item name."
                );

                return;

            }


            const duplicate =
                db.items.find(
                    x=>
                        (
                            String(x.sku || "").toLowerCase() === item.sku.toLowerCase()
                            ||
                            (item.barcode && String(x.barcode || "").toLowerCase() === item.barcode.toLowerCase())
                        )
                        &&
                        x.id!==item.id
                );


            if(duplicate){

                toast(
                    "SKU code already exists."
                );

                return;

            }


            const index =
                db.items.findIndex(
                    x=>x.id===item.id
                );


            if(index>=0){

                db.items[index]=
                    item;

                activity(
                    "Inventory updated",
                    item.sku+
                    " — "+
                    item.name
                );

            }else{

                db.items.push(
                    item
                );

                activity(
                    "Inventory created",
                    item.sku+
                    " — "+
                    item.name
                );

            }


            saveDB();

            resetInventoryForm();

            renderAll();

            toast(
                "Inventory saved successfully."
            );

            setBarcodeStatus("Ready to scan the next item.");
            document.getElementById("barcodeInput").focus();

        }
    );


function resetInventoryForm(){

    document
        .getElementById(
            "inventoryForm"
        )
        .reset();


    document
        .getElementById(
            "itemId"
        )
        .value = "";


    document
        .getElementById(
            "inventoryTitle"
        )
        .textContent =
        "Add Inventory Item";


    document
        .getElementById(
            "photoPreview"
        )
        .textContent =
        "No photo selected";


    document
        .getElementById(
            "quantity"
        )
        .value =
        0;


    document
        .getElementById(
            "reorderLevel"
        )
        .value =
        10;


    document
        .getElementById(
            "purchaseDate"
        )
        .value =
        currentDate();

}


document
    .getElementById(
        "clearForm"
    )
    .addEventListener(
        "click",
        resetInventoryForm
    );


document
    .getElementById(
        "inventorySearch"
    )
    .addEventListener(
        "input",
        renderInventory
    );


/* BARCODE RECEIVING */

function setBarcodeStatus(message, type=""){
    const status = document.getElementById("barcodeStatus");
    status.textContent = message;
    status.className = "barcode-status" + (type ? " " + type : "");
}

function receiveScannedBarcode(rawCode){
    const code = String(rawCode || "").trim();
    if(!code){
        setBarcodeStatus("No barcode was read. Try scanning again.", "error");
        return;
    }

    const existing = db.items.find(item =>
        [item.sku, item.barcode].some(value =>
            String(value || "").trim().toLowerCase() === code.toLowerCase()
        )
    );

    if(existing){
        existing.quantity = Number(existing.quantity || 0) + 1;
        if(document.getElementById("itemId").value === existing.id){
            document.getElementById("quantity").value = existing.quantity;
        }
        activity("Stock received by barcode", `${existing.sku} — ${existing.name} (+1)`);
        saveDB();
        renderAll();
        setBarcodeStatus(`${existing.name}: quantity increased to ${existing.quantity} ${existing.unit}.`, "success");
        toast("One unit received.");
        return;
    }

    const item = {
        id: id(),
        name: "Needs product details",
        sku: code,
        barcode: code,
        photo: "",
        category: "Other",
        unit: "pcs",
        quantity: 1,
        reorder: 10,
        zone: "A-01",
        bin: "",
        supplier: "TATA Tech",
        purchaseDate: currentDate(),
        expiryDate: "",
        needsDetails: true
    };

    db.items.push(item);
    activity("New item added by barcode scan", `${code} — details required (+1)`);
    saveDB();
    renderAll();
    setBarcodeStatus(`New barcode ${code} added with 1 unit. Complete its details from the inventory register.`, "success");
    toast("New item added. Use Complete Details in the inventory register.");
}

const barcodeInput = document.getElementById("barcodeInput");
let barcodeInputTimer = null;

function processBarcodeInput(){
    const code = barcodeInput.value;
    if(!code.trim()) return;
    barcodeInput.value = "";
    receiveScannedBarcode(code);
}

barcodeInput.addEventListener("input", function(){
    clearTimeout(barcodeInputTimer);
    barcodeInputTimer = setTimeout(processBarcodeInput, 300);
});

barcodeInput.addEventListener("keydown", function(event){
    if(event.key !== "Enter") return;
    event.preventDefault();
    clearTimeout(barcodeInputTimer);
    processBarcodeInput();
});

let barcodeStream = null;
let barcodeFrame = null;
let barcodeDetector = null;
let barcodeDetecting = false;

function stopBarcodeCamera(){
    if(barcodeFrame) cancelAnimationFrame(barcodeFrame);
    barcodeFrame = null;
    if(barcodeStream){
        barcodeStream.getTracks().forEach(track => track.stop());
        barcodeStream = null;
    }
    const video = document.getElementById("barcodeVideo");
    video.srcObject = null;
    document.getElementById("barcodeCameraPanel").hidden = true;
    document.getElementById("startBarcodeCamera").disabled = false;
}

async function scanBarcodeCameraFrame(){
    if(!barcodeStream) return;
    const video = document.getElementById("barcodeVideo");
    if(video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !barcodeDetecting){
        barcodeDetecting = true;
        try{
            const results = await barcodeDetector.detect(video);
            if(results.length && results[0].rawValue){
                const code = results[0].rawValue;
                stopBarcodeCamera();
                receiveScannedBarcode(code);
                return;
            }
        }catch(error){
            stopBarcodeCamera();
            setBarcodeStatus("Camera scan failed. Use a USB/Bluetooth scanner or enter the barcode.", "error");
            return;
        }finally{
            barcodeDetecting = false;
        }
    }
    barcodeFrame = requestAnimationFrame(scanBarcodeCameraFrame);
}

document.getElementById("startBarcodeCamera").addEventListener("click", async function(){
    if(!("BarcodeDetector" in window) || !navigator.mediaDevices?.getUserMedia){
        setBarcodeStatus("Camera barcode scanning is not supported here. Use a USB/Bluetooth scanner or enter the code.", "error");
        return;
    }
    try{
        barcodeDetector = new BarcodeDetector();
        barcodeStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { facingMode: { ideal: "environment" } }
        });
        const panel = document.getElementById("barcodeCameraPanel");
        const video = document.getElementById("barcodeVideo");
        video.srcObject = barcodeStream;
        panel.hidden = false;
        this.disabled = true;
        await video.play();
        setBarcodeStatus("Camera ready. Hold a barcode inside the video frame.");
        scanBarcodeCameraFrame();
    }catch(error){
        stopBarcodeCamera();
        setBarcodeStatus("Could not open the camera. Check browser permission or use a USB/Bluetooth scanner.", "error");
    }
});

document.getElementById("stopBarcodeCamera").addEventListener("click", stopBarcodeCamera);

document.addEventListener("visibilitychange", function(){
    if(document.hidden) stopBarcodeCamera();
});

document
    .getElementById("inventorySearch")
    .addEventListener("keydown", function(event){
        if(event.key !== "Enter") return;

        const scannedSku = this.value.trim().toLowerCase();
        const match = db.items.find(item =>
            String(item.sku || "").trim().toLowerCase() === scannedSku
        );

        if(match){
            event.preventDefault();
            editInventory(match.id);
        }
    });


/* PHOTO */

function loadPhoto(
    file
){

    if(!file)return;

    if(
        !file.type.startsWith(
            "image/"
        )
    ){

        toast(
            "Please select an image."
        );

        return;

    }

    const reader =
        new FileReader();

    reader.onload=
        function(){

            document
                .getElementById(
                    "photoPreview"
                )
                .innerHTML =
                `
                <img
                    src="${reader.result}"
                    alt="Preview">
                `;

        };

    reader.readAsDataURL(
        file
    );

}


document
    .getElementById(
        "takePhoto"
    )
    .addEventListener(
        "click",
        function(){

            document
                .getElementById(
                    "cameraInput"
                )
                .click();

        }
    );


document
    .getElementById(
        "galleryButton"
    )
    .addEventListener(
        "click",
        function(){

            document
                .getElementById(
                    "galleryInput"
                )
                .click();

        }
    );


document
    .getElementById(
        "cameraInput"
    )
    .addEventListener(
        "change",
        function(){

            loadPhoto(
                this.files[0]
            );

        }
    );


document
    .getElementById(
        "galleryInput"
    )
    .addEventListener(
        "change",
        function(){

            loadPhoto(
                this.files[0]
            );

        }
    );


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard(){

    const low =
        db.items.filter(
            item=>
                Number(
                    item.quantity||0
                ) > 0
                &&
                Number(
                    item.quantity||0
                )
                <=
                Number(
                    item.reorder||0
                )
        );


    const out =
        db.items.filter(
            item=>
                Number(
                    item.quantity||0
                ) <= 0
        );


    document
        .getElementById(
            "totalSku"
        )
        .textContent =
        db.items.length;


    document
        .getElementById(
            "totalUnits"
        )
        .textContent =
        db.items
            .reduce(
                (
                    total,
                    item
                )=>
                    total+
                    Number(
                        item.quantity||0
                    ),
                0
            )
            .toLocaleString();


    document
        .getElementById(
            "lowStock"
        )
        .textContent =
        low.length;


    document
        .getElementById(
            "outStock"
        )
        .textContent =
        out.length;


    const alerts =
        low.concat(out);


    document
        .getElementById(
            "dashboardAlerts"
        )
        .innerHTML =
        alerts.length
        ?
        alerts
            .slice(0,8)
            .map(
                item=>{

                    const state =
                        stockStatus(
                            item
                        );

                    return `

                    <div class="row">

                        <span>

                            <b>
                                ${safe(
                                    item.name
                                )}
                            </b>

                            <div class="muted">

                                ${safe(
                                    item.zone
                                )}
                                /
                                ${safe(
                                    item.bin
                                )}

                            </div>

                        </span>

                        <span
                            class="badge ${state[0]}">

                            ${state[1]}

                        </span>

                    </div>

                    `;

                }
            )
            .join("")
        :
        `
        <div class="empty">
            No stock alerts.
        </div>
        `;


    const zones={};


    db.items.forEach(
        item=>{

            zones[item.zone] =
                (
                    zones[item.zone] ||
                    0
                )
                +
                Number(
                    item.quantity||0
                );

        }
    );


    document
        .getElementById(
            "dashboardZones"
        )
        .innerHTML =
        Object.entries(
            zones
        )
        .sort(
            (
                a,
                b
            )=>
                b[1]-a[1]
        )
        .map(
            (
                [
                    zone,
                    quantity
                ]
            )=>
            `

            <div class="row">

                <b>
                    📍
                    ${safe(zone)}
                </b>

                <strong>
                    ${quantity.toLocaleString()}
                    units
                </strong>

            </div>

            `
        )
        .join("")
        ||
        `
        <div class="empty">
            No warehouse zone data.
        </div>
        `;

}


/* =========================================================
   REPORTS
========================================================= */

function renderReports(){

    const zones={};


    db.items.forEach(
        item=>{

            zones[item.zone] =
                (
                    zones[item.zone] ||
                    0
                )
                +
                Number(
                    item.quantity||0
                );

        }
    );


    document
        .getElementById(
            "zonesPage"
        )
        .innerHTML =
        Object.entries(
            zones
        )
        .map(
            (
                [
                    zone,
                    quantity
                ]
            )=>
            `

            <div class="zone-card">

                <h4>
                    📍
                    ${safe(zone)}
                </h4>

                <p>
                    ${quantity.toLocaleString()}
                    units
                </p>

            </div>

            `
        )
        .join("")
        ||
        `
        <div class="empty">
            No warehouse zones configured.
        </div>
        `;


    const alerts =
        db.items.filter(
            item=>
                Number(
                    item.quantity||0
                )
                <=
                Number(
                    item.reorder||0
                )
        );


    document
        .getElementById(
            "alertsPage"
        )
        .innerHTML =
        alerts.length
        ?
        alerts.map(
            item=>{

                const state =
                    stockStatus(
                        item
                    );

                return `

                <div class="row">

                    <span>

                        <b>
                            ${safe(
                                item.name
                            )}
                        </b>

                        <div class="muted">

                            Current:
                            ${item.quantity}

                            • Reorder:
                            ${item.reorder}

                        </div>

                    </span>

                    <span
                        class="badge ${state[0]}">

                        ${state[1]}

                    </span>

                </div>

                `;

            }
        ).join("")
        :
        `
        <div class="empty">
            No operational alerts.
        </div>
        `;


    const suppliers={};


    db.items.forEach(
        item=>{

            suppliers[item.supplier] =
                (
                    suppliers[item.supplier] ||
                    0
                )
                +
                1;

        }
    );


    document
        .getElementById(
            "suppliersPage"
        )
        .innerHTML =
        Object.entries(
            suppliers
        )
        .map(
            (
                [
                    supplier,
                    count
                ]
            )=>
            `

            <div class="row">

                <b>
                    ${safe(supplier)}
                </b>

                <span>
                    ${count}
                    SKU(s)
                </span>

            </div>

            `
        )
        .join("")
        ||
        `
        <div class="empty">
            No suppliers linked.
        </div>
        `;


    document
        .getElementById(
            "activityPage"
        )
        .innerHTML =
        db.activity
            .map(
                record=>
                `

                <div class="row">

                    <span>

                        <b>
                            ${safe(
                                record.action
                            )}
                        </b>

                        <div class="muted">
                            ${safe(
                                record.detail
                            )}
                        </div>

                    </span>

                    <span class="muted">

                        ${new Date(
                            record.time
                        ).toLocaleString()}

                    </span>

                </div>

                `
            )
            .join("")
        ||
        `
        <div class="empty">
            No activity yet.
        </div>
        `;

}


/* =========================================================
   SETTINGS
========================================================= */

document
    .getElementById(
        "loadDemo"
    )
    .addEventListener(
        "click",
        function(){

            const date =
                currentDate();


            db.items=[

                {
                    id:id(),
                    name:
                        "Wireless Barcode Scanner",
                    sku:
                        "WH-EL-001",
                    photo:"",
                    category:
                        "Electronics",
                    unit:
                        "pcs",
                    quantity:8,
                    reorder:10,
                    zone:
                        "A-01",
                    bin:
                        "Rack 04 / Bin 02",
                    supplier:
                        "ABC Tech",
                    purchaseDate:
                        date,
                    expiryDate:""
                },


                {
                    id:id(),
                    name:
                        "Shipping Cartons",
                    sku:
                        "WH-PK-014",
                    photo:"",
                    category:
                        "Packaging",
                    unit:
                        "pcs",
                    quantity:250,
                    reorder:100,
                    zone:
                        "B-02",
                    bin:
                        "Rack 02 / Bin 09",
                    supplier:
                        "PackPro",
                    purchaseDate:
                        date,
                    expiryDate:""
                },


                {
                    id:id(),
                    name:
                        "Safety Gloves",
                    sku:
                        "WH-HW-019",
                    photo:"",
                    category:
                        "Hardware",
                    unit:
                        "box",
                    quantity:0,
                    reorder:15,
                    zone:
                        "C-01",
                    bin:
                        "Rack 01 / Bin 04",
                    supplier:
                        "SafeWork",
                    purchaseDate:
                        date,
                    expiryDate:""
                },


                {
                    id:id(),
                    name:
                        "LED Work Lights",
                    sku:
                        "WH-EL-023",
                    photo:"",
                    category:
                        "Electronics",
                    unit:
                        "pcs",
                    quantity:35,
                    reorder:10,
                    zone:
                        "A-02",
                    bin:
                        "Rack 06 / Bin 01",
                    supplier:
                        "BrightLine",
                    purchaseDate:
                        date,
                    expiryDate:""
                },


                {
                    id:id(),
                    name:
                        "Metal Shelving Set",
                    sku:
                        "WH-FU-005",
                    photo:"",
                    category:
                        "Furniture",
                    unit:
                        "set",
                    quantity:12,
                    reorder:4,
                    zone:
                        "D-01",
                    bin:
                        "Floor Zone",
                    supplier:
                        "Warehouse Systems",
                    purchaseDate:
                        date,
                    expiryDate:""
                }

            ];


            db.activity=[];


            activity(
                "Demo data loaded",
                "Warehouse demonstration dataset"
            );


            saveDB();
            renderAll();


            toast(
                "Demo data loaded."
            );

        }
    );


/* EXPORT INVENTORY AS A SPREADSHEET-FRIENDLY CSV */

document
    .getElementById("exportInventoryCsv")
    .addEventListener("click", function(){

        const headers = [
            "SKU", "Barcode", "Item", "Category", "Quantity", "Unit",
            "Reorder Level", "Status", "Zone", "Bin", "Supplier",
            "Purchase Date", "Expiry Date"
        ];

        const csvCell = value => {
            const text = String(value ?? "");
            const safeText = /^[\s]*[=+@-]/.test(text)
                ? "'" + text
                : text;
            return '"' + safeText.replace(/"/g, '""') + '"';
        };

        const rows = db.items.map(item => [
            item.sku,
            item.barcode,
            item.name,
            item.category,
            item.quantity,
            item.unit,
            item.reorder,
            stockStatus(item)[1],
            item.zone,
            item.bin,
            item.supplier,
            item.purchaseDate,
            item.expiryDate
        ]);

        const csv = "\uFEFF" + [headers, ...rows]
            .map(row => row.map(csvCell).join(","))
            .join("\r\n");

        const url = URL.createObjectURL(new Blob([csv], {
            type: "text/csv;charset=utf-8"
        }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `warehouse-inventory-${currentDate()}.csv`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);

        toast("Inventory CSV downloaded.");
    });


/* EXPORT BACKUP */

document
    .getElementById(
        "exportBackup"
    )
    .addEventListener(
        "click",
        function(){

            const blob =
                new Blob(
                    [
                        JSON.stringify(
                            db,
                            null,
                            2
                        )
                    ],
                    {
                        type:
                            "application/json"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );

            link.href =
                url;

            link.download =
                "warehouse-automation-backup.json";

            link.click();

            URL.revokeObjectURL(
                url
            );

            toast(
                "Backup exported."
            );

        }
    );


/* RESET */

document
    .getElementById(
        "resetData"
    )
    .addEventListener(
        "click",
        function(){

            if(
                !confirm(
                    "Delete all warehouse inventory data?"
                )
            )
                return;


            db={
                items:[],
                activity:[]
            };


            saveDB();
            renderAll();


            toast(
                "All warehouse data deleted."
            );

        }
    );


/* NOTIFICATIONS */

document
    .getElementById(
        "enableNotifications"
    )
    .addEventListener(
        "click",
        async function(){

            if(
                !("Notification" in window)
            ){

                toast(
                    "Notifications are not supported."
                );

                return;

            }


            const result =
                await Notification
                    .requestPermission();


            if(
                result ===
                "granted"
            ){

                const count =
                    db.items.filter(
                        item=>
                            Number(
                                item.quantity||0
                            )
                            <=
                            Number(
                                item.reorder||0
                            )
                    ).length;


                toast(
                    "Notifications enabled."
                );


                if(count>0){

                    new Notification(
                        "Warehouse Alert",
                        {
                            body:
                                count+
                                " item(s) need attention."
                        }
                    );

                }

            }else{

                toast(
                    "Notification permission was not granted."
                );

            }

        }
    );


/* =========================================================
   MASTER RENDER
========================================================= */

function renderAll(){

    renderDashboard();

    renderInventory();

    renderReports();

}


/* =========================================================
   COLOR THEME
========================================================= */

const THEME_KEY =
    "warehouse_theme_v1";


function preferredTheme(){

    try{

        const savedTheme =
            localStorage.getItem(
                THEME_KEY
            );


        if(
            savedTheme === "dark" ||
            savedTheme === "light"
        ){
            return savedTheme;
        }

    }catch(error){}


    return window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
        ?
        "dark"
        :
        "light";

}


function updateThemeControls(){

    const isDark =
        document.documentElement
            .classList
            .contains(
                "dark-mode"
            );


    document
        .querySelectorAll(
            "[data-theme-toggle]"
        )
        .forEach(
            toggle=>{

                const modeName =
                    isDark
                    ?
                    "light"
                    :
                    "dark";

                toggle.setAttribute(
                    "aria-label",
                    "Switch to " +
                    modeName +
                    " mode"
                );

                toggle.setAttribute(
                    "aria-pressed",
                    String(isDark)
                );

                toggle.title =
                    "Switch to " +
                    modeName +
                    " mode";

                toggle.querySelector(
                    "span[aria-hidden='true']"
                ).textContent =
                    isDark
                    ?
                    "☀️"
                    :
                    "🌙";

                toggle.querySelector(
                    ".theme-toggle-text"
                ).textContent =
                    isDark
                    ?
                    "Light mode"
                    :
                    "Dark mode";

            }
        );


    document
        .querySelector(
            "meta[name='theme-color']"
        )
        .setAttribute(
            "content",
            isDark
            ?
            "rgb(15, 23, 42)"
            :
            "rgb(37, 99, 235)"
        );

}


function setTheme(
    theme,
    savePreference=false
){

    const isDark =
        theme === "dark";


    document.documentElement
        .classList
        .toggle(
            "dark-mode",
            isDark
        );


    if(savePreference){

        try{

            localStorage.setItem(
                THEME_KEY,
                theme
            );

        }catch(error){}

    }


    updateThemeControls();

}


document
    .querySelectorAll(
        "[data-theme-toggle]"
    )
    .forEach(
        toggle=>{

            toggle.addEventListener(
                "click",
                function(){

                    setTheme(
                        document.documentElement
                            .classList
                            .contains(
                                "dark-mode"
                            )
                        ?
                        "light"
                        :
                        "dark",
                        true
                    );

                }
            );

        }
    );


setTheme(
    preferredTheme()
);


/* =========================================================
   INITIALIZE
========================================================= */

document
    .getElementById(
        "purchaseDate"
    )
    .value =
    currentDate();


restoreSession();

renderAll();
