sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {
                var dadosGerais = {};
                let classificacao = {};
                let partidas = {};

                let dadosModel = new JSONModel(dadosGerais);
                let classificacaoModel = new JSONModel(classificacao);
                let partidasModel = new JSONModel(partidas);

                // atribuindo 3 modelos à tela - view
                this.getView().setModel(dadosModel, "ModeloDadosGerais");
                this.getView().setModel(classificacaoModel, "ModeloClassificacao");
                this.getView().setModel(partidasModel, "ModeloPartidas");
                
                this.buscarDadosGerais();
                this.buscarClassificacao();

            },

            buscarDadosGerais: function(){
                //OBTER O MODEL A SER ATUALIZADO
                let dadosModel2 = this.getView().getModel("ModeloDadosGerais");
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method: "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                     "Authorization" : "Bearer live_2600ae5538b6bb9db733103960a426",                     
                    }
                }

                //chamada da API
                $.ajax(configuracoes)
                
                .done(function(resposta){
                    dadosModel2.setData(resposta);
                    this.buscarPartidas(resposta.rodada_atual.rodada);
                }.bind(this) )
            

                .fail(function(erro){
 
                    debugger
                });

            },

            buscarClassificacao: function(){
                //OBTER O MODEL A SER ATUALIZADO
                let classificacaoModel2 = this.getView().getModel("ModeloClassificacao");
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method: "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                     "Authorization" : "Bearer live_2600ae5538b6bb9db733103960a426",
                    }
                }

                //chamada da API
                $.ajax(configuracoes)
                
                .done(function(resposta){
                    classificacaoModel2.setData({"classificacao": resposta});
                })
            

                .fail(function(erro){
 
                });
            },
        
            buscarPartidas: function(rodada){
                //OBTER O MODEL A SER ATUALIZADO
                let partidasModel2 = this.getView().getModel("ModeloPartidas");
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    method: "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                     "Authorization" : "Bearer live_2600ae5538b6bb9db733103960a426",
                    }
                }

                //chamada da API
                $.ajax(configuracoes)
                
                .done(function(resposta){
                    partidasModel2.setData(resposta);
                })
        

                .fail(function(erro){
 
                });
            }


        });
    });
