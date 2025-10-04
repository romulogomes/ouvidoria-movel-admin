<?php

    function geraNumeroProtocolo($idUsuario) {
        $today = getdate();

        $protocolo = $today[0].$idUsuario;

        return $protocolo;
    }

?>