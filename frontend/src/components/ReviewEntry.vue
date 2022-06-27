<template>
  <div class="shadow review">
    <div class="row bar">
      <div class="col-sm-1">
        <img class="profilePic" alt="User Picture" src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Helmut_Kohl_%281996%29.jpg">
      </div>
      <div class="col-xl-6 ">
        <div class="name"> {{ name }}</div>
        <div class="date"> {{ date }} </div>
      </div>
      <div class="col-5 rating">
        <font-awesome-icon icon="fa-solid fa-star" class="star" v-if="stars >= 1"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star" v-if="stars >= 2"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star" v-if="stars >= 3"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star" v-if="stars >= 4"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star" v-if="stars >= 5"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star-gray" v-if="stars < 1"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star-gray" v-if="stars < 2"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star-gray" v-if="stars < 3"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star-gray" v-if="stars < 4"/>
        <font-awesome-icon icon="fa-solid fa-star" class="star-gray" v-if="stars < 5"/>
      </div>
    </div>
    <p class="desc"> {{ desc }} </p>
  </div>
</template>

<script>
export default {
  name: "ReviewEntry",
  props: {
    name: String,
    date: String,
    desc: String,
    stars: Number
  }
}
</script>

<style scoped>

.review {
  margin-right: 2rem;
}
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
.star-gray {
  color: gray;
  height: 1.5rem;
  width: 1.5rem;
}
.rating {
  float: right;
  margin-top: 2rem;
  text-align: right;
  padding-right: 5rem;
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
