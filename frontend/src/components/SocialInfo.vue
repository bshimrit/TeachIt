<template>
    <section>   
        <a class="facebook margin-right20" :href="socialInfo.facebook">
            <i class="fa fa-facebook" aria-hidden="true"></i>
          </a>
          <a class="twitter margin-right20" :href="socialInfo.twitter">
              <i class="fa fa-twitter" aria-hidden="true"></i>
          </a>
          <a>
              <i class="whatsapp fa fa-whatsapp" aria-hidden="true" :href="socialInfo.twitter"></i>
          </a>
    </section>
</template>

<script>
export default {
    name: 'socialInfo',
    props: ['socialInfo']
}
</script>

<style>
    .facebook {
        background-color: #365899;
    }
</style>
