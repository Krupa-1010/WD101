//dob validation
let dob=document.getElementById("dob");


dob.addEventListener("input",()=>{
    const dobValue = new Date(dob.value);
    const today = new Date();
    const age = today.getFullYear() - dobValue.getFullYear();
    const m = today.getMonth() - dobValue.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobValue.getDate())) {
        age--;
      }

    if(age < 18 || age >55)
    {
        dob.setCustomValidity("Age must be between 18 and 55");
    }
    else{
        dob.setCustomValidity("");
    }
});



let userForm=document.getElementById("user-form");

const retrieveEntries=()=>{
    let entries=localStorage.getItem("user-entries");
    if(entries)
    {
        entries=JSON.parse(entries);
    }
    else{
        entries=[];
    }
    return entries;

}
let userEntries=retrieveEntries();

const displayEntries =()=>{
    const entries=retrieveEntries();
    const tableEntries=entries.map((entry)=>{
        const nameCell=`<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell=`<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell=`<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell=`<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell=`<td class='border px-4 py-2'>${entry.acceptTerms}</td>`;

        const row=`<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;

        return row;
    }).join('\n');

    const table=`<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">DOB</th>
    <th class="px-4 py-2">Accepted terms?</th>

    </tr>${tableEntries}</table>`;

    let details=document.getElementById("user-entries");
    details.innerHTML=table;


}


const saveUserForm =(event)=>{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;
    const acceptTerms=document.getElementById("acceptTerms").checked;

    const userData={
        name,
        email,
        password,
        dob,
        acceptTerms
    };

    userEntries.push(userData);
    

    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries();
}


userForm.addEventListener("submit", saveUserForm);

displayEntries();
