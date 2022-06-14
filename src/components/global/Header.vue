<template>
<header class="header">
    <img class="logo" src="../../assets/logo.png"/>
    <h1 class="title">
        Title
    </h1>
    <img class="userIcon" />
</header>
</template>

<style scoped>
.header {
    display: flex;
    flex-wrap: wrap;
    background-color: var(--headerColor);
    border: solid;
    box-shadow: 0 3px 6px rgba(0,0,0,0.2);;
}

.title{
    padding: 5px;
    margin: 0px;
    font-size: ver(--fontSizeTitle);
}

.logo {
    height: 45px;
    padding: 5px;
}
</style>