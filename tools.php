<?php
    require_once "inc/pageheader.php"
?>

    <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-2 text-white mb-4 animated slideInDown">Tools</h1>
            
        </div>
    </div>


    <div class="container-md">
        <div class="wrapper">
                <p><a class="backToHome" href="index.html">Back to Home</a></p>
                <h3>Mortgage Calculator and Schedule</h2>
                <div class="row calc-content">
                    <div class="calc col-5">
                        <form action="#">
                            <div class="form-group">
                                <label for="loanAmount">Loan Amount</label><span style="color:red">*</span><br>
                                <input autocomplete="off" class="form-control" type="text" id="loanAmount" placeholder="eg. 100000" required>
                                <br><span class="amountCheck" style="display:none;color:hsl(0, 50%, 50%);">This is a required field</span>
                            </div>
                            <div class="form-group">
                                <label for="extra">Extra/month</label><br>
                                <input autocomplete="off" class="form-control" type="text" id="extra" placeholder="Optional (eg. 100)">
                            </div>
                            <div class="form-group">
                                <label for="interest">Interest</label><span style="color:red">*</span><br>
                                <input autocomplete="off" class="form-control" type="text" id="interest" placeholder="eg. 4.5" required>
                                <br><span class="interestCheck" style="display:none;color:hsl(0, 50%, 50%);">This is a required field</span>
                            </div>
                            <div class="form-group">
                                <label for="term">Term</label><span style="color:red">*</span><br>
                                <input autocomplete="off" class="form-control" type="text" id="term" placeholder="eg. 30" required>
                                <br><span class="termCheck" style="display:none;color:hsl(0, 50%, 50%);">This is a required field</span>
                            </div>
                            
                            <!-- <div class="formButtons"> -->
                                <!-- <div class="buttonContainer row"> -->
                                    <input class="btn" type="submit" id="calculate" value="Get Payment" /> 
                                    <!-- <div class="col-1"></div> -->
                                    <input class="btn" type="reset" value="Reset Form" id="reset"/> 
                                    <!-- <div class="col-1"></div> -->
                                    <input class="btn" type="button" value="Schedule" id="schedule"/> 

                                <!-- </div> -->
                            <!-- </div> -->

                            
                        
                        </form>

                    </div>
                    <div class="col-2"></div>
                    <div class="report col-5">
                        <p id="mpayment"></p>
                    </div>
                </div>
                <div class="schedule">
                    <hr style="background: #ff6f61">
                    <div class="schedule-content">
                        
                    </div>
                </div>
        </div>
    </div>
    <!-- <script src="js/calculator.js"></script> -->
<?php
require_once "inc/pagefooter.php"
?>