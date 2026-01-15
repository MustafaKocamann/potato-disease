/**
 * ============================================================================
 * POTATO GUARD - Patates Hastalık Tespit Sistemi
 * ============================================================================
 * 
 * Bu dosya, web uygulamasının ana bileşenini içerir.
 * Kullanıcının patates yaprağı fotoğrafı yüklemesini ve
 * yapay zeka ile hastalık tespiti yapmasını sağlar.
 * 
 * Geliştirici: Mustafa
 * Tarih: 2026
 * ============================================================================
 */

import { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { 
  CardActionArea, 
  CardMedia, 
  Grid, 
  Button, 
  CircularProgress,
  Fade,
  Chip,
  Box,
  LinearProgress
} from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import Clear from '@material-ui/icons/Clear';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import BugReportIcon from '@material-ui/icons/BugReport';

const axios = require("axios").default;

/**
 * Stil tanımlamaları - Material-UI makeStyles
 */
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  
  clearButton: {
    width: "100%",
    borderRadius: "12px",
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
    marginTop: "20px",
    '&:hover': {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
    },
  },
  
  mainContainer: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  
  heroSection: {
    textAlign: "center",
    padding: "30px 20px",
    marginBottom: "20px",
  },
  
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "12px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "1.8rem",
    },
  },
  
  heroSubtitle: {
    fontSize: "1rem",
    color: "rgba(255, 255, 255, 0.7)",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.5,
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.9rem",
    },
  },
  
  // Ana içerik kartı - resim ve sonuç yan yana veya alt alta
  mainCard: {
    maxWidth: "900px",
    width: "100%",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
    padding: "30px",
  },
  
  // Resim yükleme alanı
  uploadSection: {
    width: "100%",
    marginBottom: "20px",
  },
  
  imagePreview: {
    width: "100%",
    maxHeight: "350px",
    objectFit: "contain",
    borderRadius: "16px",
    marginBottom: "20px",
  },
  
  dropzoneContainer: {
    padding: "20px",
  },
  
  // Sonuç bölümü - resmin hemen altında
  resultSection: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "25px",
    marginTop: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  
  resultTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "white",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  
  healthyChip: {
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    color: "white",
    fontSize: "1rem",
    fontWeight: 600,
    padding: "20px 25px",
    borderRadius: "50px",
  },
  
  earlyBlightChip: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    fontSize: "1rem",
    fontWeight: 600,
    padding: "20px 25px",
    borderRadius: "50px",
  },
  
  lateBlightChip: {
    background: "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)",
    color: "white",
    fontSize: "1rem",
    fontWeight: 600,
    padding: "20px 25px",
    borderRadius: "50px",
  },
  
  confidenceContainer: {
    marginTop: "20px",
  },
  
  confidenceLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "0.9rem",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
  },
  
  confidenceBar: {
    height: "10px",
    borderRadius: "5px",
    background: "rgba(255, 255, 255, 0.1)",
  },
  
  appbar: {
    background: "transparent",
    boxShadow: "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    marginBottom: "10px",
  },
  
  navbarBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  
  brandIcon: {
    fontSize: "1.8rem",
    color: "#667eea",
  },
  
  brandText: {
    fontSize: "1.3rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  
  loader: {
    color: "#667eea",
  },
  
  loadingText: {
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: "15px",
    fontSize: "1rem",
  },
  
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
  },
  
  featuresSection: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "0.85rem",
  },
  
  featureIcon: {
    color: "#667eea",
    fontSize: "1.2rem",
  },
  
  infoCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    padding: "15px",
    marginTop: "15px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  
  infoTitle: {
    color: "white",
    fontSize: "0.95rem",
    fontWeight: 600,
    marginBottom: "8px",
  },
  
  infoText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "0.85rem",
    lineHeight: 1.5,
  },
  
  footer: {
    textAlign: "center",
    padding: "20px",
    marginTop: "auto",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  
  footerText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "0.8rem",
  },
}));

/**
 * Ana Bileşen - ImageUpload
 */
export const ImageUpload = () => {
  const classes = useStyles();
  
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  
  let confidence = 0;

  const sendFile = useCallback(async () => {
    if (image && selectedFile) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      
      try {
        let res = await axios({
          method: "post",
          url: process.env.REACT_APP_API_URL,
          data: formData,
        });
        
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error("API hatası:", error);
      }
      
      setIsloading(false);
    }
  }, [image, selectedFile]);

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview, sendFile]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case "Healthy":
        return <CheckCircleIcon style={{ fontSize: 32, color: "#38ef7d" }} />;
      case "Early Blight":
        return <WarningIcon style={{ fontSize: 32, color: "#f5576c" }} />;
      case "Late Blight":
        return <ErrorIcon style={{ fontSize: 32, color: "#f45c43" }} />;
      default:
        return <BugReportIcon style={{ fontSize: 32 }} />;
    }
  };

  const getChipClass = (status) => {
    switch(status) {
      case "Healthy":
        return classes.healthyChip;
      case "Early Blight":
        return classes.earlyBlightChip;
      case "Late Blight":
        return classes.lateBlightChip;
      default:
        return classes.healthyChip;
    }
  };

  const getDiseaseInfo = (status) => {
    switch(status) {
      case "Healthy":
        return {
          title: "🌱 Sağlıklı Bitki",
          description: "Tebrikler! Patates bitkiniyz sağlıklı görünüyor. Düzenli sulama ve gübrelemeye devam edin."
        };
      case "Early Blight":
        return {
          title: "⚠️ Erken Yanıklık (Early Blight)",
          description: "Alternaria solani mantarının neden olduğu bu hastalık, yapraklarda kahverengi lekeler oluşturur. Enfekte yaprakları uzaklaştırın ve fungusit uygulayın."
        };
      case "Late Blight":
        return {
          title: "🚨 Geç Yanıklık (Late Blight)",
          description: "Phytophthora infestans'ın neden olduğu ciddi bir hastalık. Yapraklarda su emmiş gibi lekeler görülür. Acil müdahale gerekir, sistemik fungusit kullanın."
        };
      default:
        return { title: "", description: "" };
    }
  };

  return (
    <React.Fragment>
      {/* Navbar */}
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <div className={classes.navbarBrand}>
            <img src="/logo.svg" alt="PotatoGuard" style={{ width: 40, height: 40 }} />
            <Typography className={classes.brandText}>
              PotatoGuard
            </Typography>
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>

      {/* Ana İçerik */}
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        
        {/* Hero Bölümü */}
        <div className={classes.heroSection}>
          <Typography className={classes.heroTitle}>
            🥔 Yapay Zeka ile Patates Hastalık Tespiti
          </Typography>
          <Typography className={classes.heroSubtitle}>
            Patates yapraklarınızın fotoğrafını yükleyin, yapay zeka modelimiz 
            saniyeler içinde hastalık analizi yapsın.
          </Typography>
          
          <div className={classes.featuresSection}>
            <div className={classes.featureItem}>
              <CheckCircleIcon className={classes.featureIcon} />
              <span>%95+ Doğruluk</span>
            </div>
            <div className={classes.featureItem}>
              <CheckCircleIcon className={classes.featureIcon} />
              <span>Anında Sonuç</span>
            </div>
            <div className={classes.featureItem}>
              <CheckCircleIcon className={classes.featureIcon} />
              <span>3 Hastalık Türü</span>
            </div>
          </div>
        </div>

        {/* Ana Kart - Resim Yükleme ve Sonuç */}
        <Fade in={true} timeout={800}>
          <div className={classes.mainCard}>
            
            {/* Resim Yükleme Alanı */}
            <div className={classes.uploadSection}>
              {!image ? (
                <div className={classes.dropzoneContainer}>
                  <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Patates yaprağı fotoğrafını sürükleyip bırakın veya tıklayarak seçin"}
                    onChange={onSelectFile}
                    filesLimit={1}
                    showFileNames={true}
                    showAlerts={false}
                    Icon={CloudUploadIcon}
                  />
                </div>
              ) : (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img 
                    src={preview} 
                    alt="Yüklenen patates yaprağı" 
                    className={classes.imagePreview}
                  />
                </Box>
              )}
            </div>
            
            {/* Yükleniyor */}
            {isLoading && (
              <div className={classes.loadingContainer}>
                <CircularProgress size={50} thickness={4} className={classes.loader} />
                <Typography className={classes.loadingText}>
                  Yapay zeka analiz yapıyor...
                </Typography>
              </div>
            )}
            
            {/* Sonuç Bölümü - Resmin Hemen Altında */}
            {data && !isLoading && (
              <Fade in={true} timeout={600}>
                <div className={classes.resultSection}>
                  <Typography className={classes.resultTitle}>
                    {getStatusIcon(data.class)}
                    Analiz Sonucu
                  </Typography>
                  
                  <Box display="flex" justifyContent="center" mb={2}>
                    <Chip
                      label={data.class === "Healthy" ? "Sağlıklı" : data.class}
                      className={getChipClass(data.class)}
                    />
                  </Box>
                  
                  <div className={classes.confidenceContainer}>
                    <div className={classes.confidenceLabel}>
                      <span>Güven Oranı</span>
                      <span style={{ fontWeight: 600, color: "#667eea" }}>{confidence}%</span>
                    </div>
                    <LinearProgress 
                      variant="determinate" 
                      value={parseFloat(confidence)} 
                      className={classes.confidenceBar}
                      style={{ background: "rgba(255, 255, 255, 0.1)" }}
                    />
                  </div>
                  
                  <div className={classes.infoCard}>
                    <Typography className={classes.infoTitle}>
                      {getDiseaseInfo(data.class).title}
                    </Typography>
                    <Typography className={classes.infoText}>
                      {getDiseaseInfo(data.class).description}
                    </Typography>
                  </div>
                  
                  <Button 
                    variant="contained" 
                    className={classes.clearButton}
                    onClick={clearData} 
                    startIcon={<Clear />}
                    fullWidth
                  >
                    Yeni Analiz Yap
                  </Button>
                </div>
              </Fade>
            )}
          </div>
        </Fade>

        {/* Footer */}
        <div className={classes.footer}>
          <Typography className={classes.footerText}>
            © 2026 PotatoGuard - Yapay Zeka Destekli Tarım Teknolojileri
          </Typography>
        </div>
      </Container>
    </React.Fragment>
  );
};
