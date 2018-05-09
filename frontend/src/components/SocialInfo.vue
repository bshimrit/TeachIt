<template>
    <section class="social flex"> 
        <div  class="facebook">
            <a :href="socialInfo.facebook">
                <i class="fa fa-facebook" aria-hidden="true"></i>
            </a>
        </div>
        <div class="twitter">
            <a :href="socialInfo.twitter">
                <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
        </div>
        <div class="whatsapp">
            <a :href="socialInfo.whatsapp">
                <i class="fa fa-whatsapp" aria-hidden="true"></i>
            </a>
        </div>
    </section>
</template>

<script>
export default {
    name: 'socialInfo',
    props: ['socialInfo']
}
</script>

<style scoped>
    .social div  {
        margin-right: 20px;
        width: 30px;
        height: 30px;
        text-align: center;
        opacity: 0.5;
    }

    .social div:hover {
        opacity: 1;
    }

     .social div.facebook {
        background-color: #4267b2;
    }

    .social div.facebook a {
        color: #fff
    }

    .social div.twitter {
        background-color: #1DA1F2;
    }

    .social div.twitter a {
        color: #fff
    }

    .social div.whatsapp {
        background-color: #70e877;
    }

    .social div.whatsapp a {
        color: #fff
    }
</style>
