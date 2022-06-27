<template>
  <div class="shadow">
    <div class="row bar">
      <div class="col-sm-1">
        <img class="profilePic" src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Helmut_Kohl_%281996%29.jpg">
      </div>
      <div class="col-xl-6 ">
        <div class="name"> {{ userName }}</div>
        <div class="date"> {{ date }} </div>
      </div>
      <div class="col-5 rating">
        <font-awesome-icon icon="fa-solid fa-star" class="star"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star"/>
      </div>
    </div>
    <p class="desc"> {{ desc }} </p>
  </div>
</template>

<script>
export default {
  name: "ReviewEntry",
  data () {
    return {
      userName: 'Berta Gutenberg',
      date: 'Juni 2020',
      desc: 'Tolle Fahrte und toller Fahrer. Hat mehrere interessante Geschichten aus seiner Jugend erzählt. ' +
        'Generell war eine gute Luft im Auto anstelle des übliche Gestanks, das man von derartigen Autos erwarten würde.'
    }
  }
}
</script>

<style scoped>

.profilePic {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
.name {
  font-weight: bold;
  color: gray;
  font-size: 1.5rem;
  text-align: left;
  margin-top: .75rem;
}
.date {
  text-align: left;
}
.star {
  color: #005b52;
  height: 1.5rem;
  width: 1.5rem;
}
.rating {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.desc {
  text-align: left;
  color: gray;
  margin-left: 1.5rem;
  font-size: 1.5rem;
  margin-right: 1.5rem;
}
.bar {
  margin-bottom: 1rem;
  padding-top: 1rem;
  height: 7rem;
}
</style>
