console.log("main.js");

var address = document.getElementById('broker-address').value;
var broker_btn = document.getElementById('broker-btn-con');

var pub_button = document.getElementById('pub-btn');
var client = mqtt.connect(address)

var pub_topic = document.getElementById('pub-topic');
var pub_payload = document.getElementById('pub-payload');
var topic = document.getElementById('pub-topic').value;
var payload = document.getElementById('pub-payload').value;

var sub_topic = document.getElementById('sub-topic');
var sub_button = document.getElementById('sub-btn')

var d = new Date();


//Creating table row 
function myFunctionTableBroker() {
  client.on('message', function (topic, payload) {
    var tbody = document.getElementById('tbody-broker');
    var row = tbody.insertRow(0)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = topic;
    cell2.innerHTML = payload;
    cell3.innerHTML = d.toUTCString();
  })
}


//Creating table row 
function myFunctionTablePublish() {
  var tbody = document.getElementById('tbody-pub');
  var row = tbody.insertRow(0)
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = pub_topic.value;
  cell2.innerHTML = pub_payload.value;
  cell3.innerHTML = d.toUTCString();

}
//Creating table row 
function myFunctionTableSubscriber() {
  var tbody = document.getElementById('tbody-sub');
  var row = tbody.insertRow(0)
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = sub_topic.value;
  cell2.innerHTML = d.toUTCString();

}


broker_btn.addEventListener('click', () => {
  document.getElementById('broker-status').value = "Connecting..."
  client.on('connect', function () {
    document.getElementById('broker-status').value = "Connected!"

    pub_button.addEventListener('click', () => {
      if (pub_topic.value != "" && pub_payload.value != "") {
        client.publish(pub_topic.value, pub_payload.value);
        myFunctionTablePublish();
      } else {
        alert("Please fill out all the field to connect!")
      }

    })
    //Subscribe button event
    sub_button.addEventListener('click', () => {

      if (sub_topic.value != "") {
        client.subscribe(sub_topic.value);
        myFunctionTableSubscriber();
      } else {
        alert("Please fill out all field to connect!")
      }
    })
    myFunctionTableBroker()
  })
  $('#broker-btn-dis').click(function(){
    client='';
    $('#broker-status').val('Disconnected!');
  })
  $('#unsub-btn').click(function(){
    client='';
    $('#broker-status').val('Disconnected!');
})
})
