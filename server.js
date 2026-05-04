<script>
let fullData = [];

function loadData(){
    let data = JSON.parse(localStorage.getItem("data") || "[]");
    fullData = data;
    renderTable(data);
}

function renderTable(data){
    let html='';
    data.forEach((item,index)=>{
        html+=`
        <tr>
        <td>${item.customer}</td>
        <td>${item.site_code}</td>
        <td>${item.unit_name}</td>
        <td>
        <button class="btn btn-warning btn-sm" onclick="editRow(${index})">แก้ไข</button>
        <button class="btn btn-danger btn-sm" onclick="deleteRow(${index})">ลบ</button>
        </td>
        </tr>`;
    });
    document.getElementById('tableBody').innerHTML=html;
}

document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();

    let customer = this.customer.value;
    let site_code = this.site_code.value;
    let unit_name = this.unit_name.value;

    let data = JSON.parse(localStorage.getItem("data") || "[]");
    data.push({customer, site_code, unit_name});

    localStorage.setItem("data", JSON.stringify(data));
    loadData();
    this.reset();
});

function deleteRow(index){
    if(confirm("คุณต้องการลบจริงไหม?")){
        let data = JSON.parse(localStorage.getItem("data") || "[]");
        data.splice(index,1);
        localStorage.setItem("data", JSON.stringify(data));
        loadData();
    }
}

function editRow(index){
    let data = JSON.parse(localStorage.getItem("data") || "[]");
    let item = data[index];

    let customer = prompt("Customer", item.customer);
    let site = prompt("Site Code", item.site_code);
    let unit = prompt("หน่วยงาน", item.unit_name);

    if(customer && site && unit){
        data[index] = {customer, site_code: site, unit_name: unit};
        localStorage.setItem("data", JSON.stringify(data));
        loadData();
    }
}

document.getElementById('search').addEventListener('keyup',function(){
    let keyword=this.value.toLowerCase();
    let filtered=fullData.filter(item=>
        item.customer.toLowerCase().includes(keyword) ||
        item.site_code.toLowerCase().includes(keyword) ||
        item.unit_name.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
});

function logout(){
    a
