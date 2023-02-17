<div class="frm">
    <div class="header">
        Category
        <div class="btn-close">
            <i class="fa-solid fa-xmark " id= "btn-close"></i>
        </div>
    </div>
    <form class="upl">
        <div class="body">
            <input type="text" name="txt-edit-id" id="txt-edit-id" value="0" >
            <label for="">ID</label>
            <input type="text" name="txt-id" id="txt-id" class="frm-control" readonly>
            <label for="">Name</label>
            <input type="text" name="txt-name" id="txt-name" class="frm-control">
            <label for="">OD</label>
            <input type="text" name="txt-od" id="txt-od" class="frm-control">
            <label for="">Sataus</label>
            <select name="txt-status" id="txt-status" class="frm-control">
                <option value="1">1</option>
                <option value="2">2</option> 
            </select>
            <label for="">Photos</label>
            <div class='img-box'>
                <input type="file" name="txt-file" id="txt-file" class="txt-file">
                <input type="hidden" name="txt-photo" id='txt-photo'>
            </div>
        </div>
        <div class="footer">
            <div class= "btn-save">
                <i class="fa-solid fa-floppy-disk"></i>
                Save
            </div>
        </div>
    </form>
</div>