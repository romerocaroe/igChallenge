<template>
    <v-container>
        <div v-for="post in posts" :key="post.id">
            <p>{{posts.isLiked}}</p>
            <v-row class="text-right">
                <v-col cols="12">
                    <v-card
                        class="mx-auto mt-5"
                        max-width="800"
                        min-width="200"
                    >
                        <v-img
                        v-bind:src='post.imagePosted'
                        height="500"
                        ></v-img>

                        <v-card-title>
                            <v-row>
                                <v-col cols=6 class="text-left">
                                    <v-btn text class="pa-0 ma-0">
                                        <div v-if="!post.isLiked">
                                            <v-icon @click="updateLike(post.id,true)" large color="darken-2">mdi-cards-heart-outline</v-icon>
                                        </div>
                                        <div v-else-if="post.isLiked">
                                            <v-icon @click="updateLike(post.id,false)" large color="darken-2">mdi-cards-heart</v-icon>
                                        </div>
                                    </v-btn>
                                    {{post.amountOfLikes}}
                                </v-col>
                                <v-col cols=6>
                                    <div v-if="!editDescriptionStatus">
                                        <v-btn text class="pa-0 ma-0">
                                            {{post.description}}
                                            <v-icon @click="editDescriptionStatus=true" small color="darken-2">mdi-pencil</v-icon>
                                        </v-btn>
                                    </div>
                                    <div v-else-if="editDescriptionStatus">
                                        <v-text-field id="descriptionValue" v-model="descriptionValue" @keyup.enter="editDescription(post.id)" label="Edit Description"></v-text-field>                                        
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-title>

                        <v-card-subtitle>
                        {{post.updateDate}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div>
            <v-btn
                class="mx-4 mb-4"
                fab
                dark
                color="indigo"
                bottom
                right
                fixed
                >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>
        </div>
        <!-- <v-dialog 
            max-width="800px"
            min-width="300px"
            :value="editDescriptionStatus">
            <campaignCreateVerification
                v-on:closeDialog="editDescriptionStatus = false"
                v-on:save="save"
            />
        </v-dialog> -->

        <!-- <v-dialog
        v-model="dialog"
        width="600"
        >
            <v-card class="center">
                <v-toolbar flat dark color="primary">
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon dark >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
                </v-toolbar>

                <v-card-text class="pl-10">
                <div justify=center align=center></div>
                </v-card-text>
            </v-card>
        </v-dialog> -->
    </v-container>
</template>

<script>
import gql from 'graphql-tag'
import updateDescription from '../graphql/updateDescription.graphql'
import updateLikeStatus from '../graphql/updateLikeStatus.graphql'

export default {
    name: "PostsComponent",
    data(){
        return {
            title: "Welcome!",
            editDescriptionStatus: false,
            descriptionValue: ""
        }
    },
    apollo: {
        posts: gql`
            query posts {
                posts {
                    id
                    createdDate
                    updateDate
                    imagePosted
                    description
                    amountOfLikes
                    isLiked
                }
            }
        `
    },
    methods: {
        async editDescription(id,value,e){
            console.log(id,"  ",this.descriptionValue)
            this.editDescriptionStatus = false

            const result = await this.$apollo.mutate({
                mutation: updateDescription,
                variables: {
                    id: id,
                    description: this.descriptionValue
                },
            })
            this.$apollo.queries.posts.refetch()   
        },
        async updateLike(id,newLikeStatus){
            const result = await this.$apollo.mutate({
                mutation: updateLikeStatus,
                variables: {
                    id: id,
                    likeStatus: newLikeStatus
                },
            })
            this.$apollo.queries.posts.refetch()        
        },
    }
};
</script>

<style scoped>
</style>