export const isDesktopViewport =(page) =>{    
    const size =page.viewportSize();
    console.log("Viewport Size: ",size);
    return size.width >= 600;
}